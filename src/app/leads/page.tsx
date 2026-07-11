import { cookies } from "next/headers";
import { google } from "googleapis";
import LoginForm from "./login-form";
import LeadsDashboard from "./leads-dashboard";
import { ManagerApplication, PortfolioSubmission } from "@/lib/types";

// Suppress Node.js zlib.bytesRead deprecation warning thrown by googleapis in development
if (typeof process !== "undefined") {
  const originalEmit = process.emitWarning;
  process.emitWarning = function (warning, ...args: any[]) {
    const isZlibWarning =
      (typeof warning === "string" && warning.includes("zlib.bytesRead")) ||
      (warning instanceof Error && warning.message.includes("zlib.bytesRead"));

    if (isZlibWarning) return;
    return (originalEmit as any).apply(process, [warning, ...args]);
  };
}

// Force dynamic rendering to ensure fresh data on every visit
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Lead {
  timestamp: string;
  topic: string;
  email: string;
}

async function getLeads(): Promise<Lead[]> {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;
    const range = `${process.env.SHEET_NAME || "Sheet1"}!A:C`;

    if (!email || !key || !spreadsheetId) {
      console.warn("Google Sheet configuration missing in environment variables.");
      return [];
    }

    const auth = new google.auth.JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    // Parse rows, filter out header row, empty lines, and malformed submissions
    const leads: Lead[] = rows
      .map((row) => ({
        timestamp: row[0] || "",
        topic: row[1] || "",
        email: row[2] || "",
      }))
      .filter(
        (lead) =>
          lead.email &&
          lead.email.toLowerCase() !== "email" &&
          lead.email.includes("@")
      );

    // Return reversed so that newest submissions appear at the top
    return leads.reverse();
  } catch (err) {
    console.error("Error fetching leads from Google Sheets:", err);
    return [];
  }
}

async function getManagerApplications(): Promise<ManagerApplication[]> {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;
    const range = `ManagerApplications!A:G`;

    if (!email || !key || !spreadsheetId) {
      console.warn("Google Sheet configuration missing in environment variables.");
      return [];
    }

    const auth = new google.auth.JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Verify sheet exists to prevent 400 error
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === "ManagerApplications"
    );

    if (!sheetExists) {
      return [];
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return [];
    }

    // Skip the headers row
    const applications: ManagerApplication[] = rows
      .slice(1)
      .map((row) => ({
        timestamp: row[0] || "",
        name: row[1] || "",
        instaHandle: row[2] || "",
        previousWorks: row[3] || "",
        goalsHobbies: row[4] || "",
        birthdate: row[5] || "",
        resume: row[6] || "N/A",
      }))
      .filter((app) => app.name && app.instaHandle);

    return applications.reverse();
  } catch (err) {
    console.error("Error fetching manager applications from Google Sheets:", err);
    return [];
  }
}

async function getPortfolioSubmissions(): Promise<PortfolioSubmission[]> {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;
    const range = `PortfolioSubmissions!A:M`;

    if (!email || !key || !spreadsheetId) {
      console.warn("Google Sheet configuration missing in environment variables.");
      return [];
    }

    const auth = new google.auth.JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Verify sheet exists to prevent 400 error
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === "PortfolioSubmissions"
    );

    if (!sheetExists) {
      return [];
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return [];
    }

    // Skip the headers row
    const submissions: PortfolioSubmission[] = rows
      .slice(1)
      .map((row) => ({
        timestamp: row[0] || "",
        name: row[1] || "",
        profession: row[2] || "",
        instaHandle: row[3] || "",
        linkedin: row[4] || "N/A",
        otherSocial: row[5] || "N/A",
        projects: row[6] || "",
        testimonials: row[7] || "N/A",
        about: row[8] || "",
        skills: row[9] || "",
        services: row[10] || "",
        phone: row[11] || "",
        resume: row[12] || "N/A",
      }))
      .filter((app) => app.name && app.instaHandle);

    return submissions.reverse();
  } catch (err) {
    console.error("Error fetching portfolio submissions from Google Sheets:", err);
    return [];
  }
}

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("leads_session")?.value;

  // Render Login Form if user is not authenticated
  if (session !== "authenticated") {
    return <LoginForm />;
  }

  // Fetch and render Leads Dashboard if authenticated
  const leads = await getLeads();
  const managerApplications = await getManagerApplications();
  const portfolioSubmissions = await getPortfolioSubmissions();
  return (
    <LeadsDashboard
      leads={leads}
      managerApplications={managerApplications}
      portfolioSubmissions={portfolioSubmissions}
    />
  );
}
