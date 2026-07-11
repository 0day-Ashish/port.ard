import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const profession = formData.get("profession") as string;
    const instaHandle = formData.get("instaHandle") as string;
    const linkedin = formData.get("linkedin") as string || "N/A";
    const otherSocial = formData.get("otherSocial") as string || "N/A";
    const projects = formData.get("projects") as string;
    const testimonials = formData.get("testimonials") as string || "N/A";
    const about = formData.get("about") as string;
    const skills = formData.get("skills") as string;
    const services = formData.get("services") as string;
    const phone = formData.get("phone") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !profession || !instaHandle || !projects || !about || !skills || !services || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;

    if (!email || !key || !spreadsheetId) {
      return NextResponse.json({ ok: false, error: "Google Sheet/Drive credentials not configured" }, { status: 500 });
    }

    const auth = new google.auth.JWT({
      email,
      key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    // Step 1: Upload resume to Vercel Blob or Google Drive if present
    let resumeUrl = "N/A";
    if (resumeFile && resumeFile.size > 0) {
      const fileName = `${name.replace(/\s+/g, "_")}_PortfolioResume_${Date.now()}.${resumeFile.name.split(".").pop()}`;

      if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          const blob = await put(fileName, resumeFile, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          resumeUrl = blob.url;
        } catch (blobErr) {
          console.error("Vercel Blob upload error:", blobErr);
        }
      } else {
        // Fallback to Google Drive
        try {
          const drive = google.drive({ version: "v3", auth });
          const bytes = await resumeFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const stream = Readable.from(buffer);

          const folderId = process.env.DRIVE_FOLDER_ID;
          const driveResponse = await drive.files.create({
            requestBody: {
              name: fileName,
              mimeType: resumeFile.type,
              parents: folderId ? [folderId] : undefined,
            },
            media: {
              mimeType: resumeFile.type,
              body: stream,
            },
            supportsAllDrives: true,
            fields: "id, webViewLink",
          });

          const fileId = driveResponse.data.id;
          if (fileId) {
            await drive.permissions.create({
              fileId,
              requestBody: {
                role: "reader",
                type: "anyone",
              },
            });
            resumeUrl = driveResponse.data.webViewLink || "N/A";
          }
        } catch (driveErr) {
          console.error("Google Drive upload error:", driveErr);
        }
      }
    }

    const sheets = google.sheets({ version: "v4", auth });

    // Step 2: Ensure PortfolioSubmissions sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTitle = "PortfolioSubmissions";
    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === sheetTitle
    );

    if (!sheetExists) {
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });

      // Add headers
      const headers = [
        "Timestamp",
        "Name",
        "Profession/Passion",
        "Instagram",
        "LinkedIn",
        "Other Social",
        "Projects/Works",
        "Testimonials",
        "About Yourself",
        "Skills/Stacks",
        "Services",
        "Phone",
        "Resume/CV",
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTitle}!A:M`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Step 3: Append values
    const values = [
      [
        new Date().toISOString(),
        name,
        profession,
        instaHandle,
        linkedin,
        otherSocial,
        projects,
        testimonials,
        about,
        skills,
        services,
        phone,
        resumeUrl,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:M`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/portfolio-apply error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Server error" }, { status: 500 });
  }
}
