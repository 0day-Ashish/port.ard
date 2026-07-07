import { cookies } from "next/headers";
import { google } from "googleapis";
import LoginForm from "./login-form";
import LeadsDashboard from "./leads-dashboard";

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

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("leads_session")?.value;

  // Render Login Form if user is not authenticated
  if (session !== "authenticated") {
    return <LoginForm />;
  }

  // Fetch and render Leads Dashboard if authenticated
  const leads = await getLeads();
  return <LeadsDashboard leads={leads} />;
}
