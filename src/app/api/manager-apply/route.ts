import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, instaHandle, previousWorks, goalsHobbies, birthdate } = body;

    if (!name || !instaHandle || !previousWorks || !goalsHobbies || !birthdate) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;

    if (!email || !key || !spreadsheetId) {
      return NextResponse.json({ ok: false, error: "Google Sheet credentials not configured" }, { status: 500 });
    }

    const auth = new google.auth.JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Step 1: Ensure ManagerApplications sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTitle = "ManagerApplications";
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
        "Instagram Handle",
        "Previous Works",
        "Goals & Hobbies",
        "Birthdate",
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTitle}!A:F`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Step 2: Append values
    const values = [
      [
        new Date().toISOString(),
        name,
        instaHandle,
        previousWorks || "N/A",
        goalsHobbies,
        birthdate,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:F`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/manager-apply error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Server error" }, { status: 500 });
  }
}
