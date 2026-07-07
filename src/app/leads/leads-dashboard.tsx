"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "./actions";
import Link from "next/link";
import { Copy, Check, LogOut, FileSpreadsheet } from "lucide-react";

interface Lead {
  timestamp: string;
  topic: string;
  email: string;
}

interface LeadsDashboardProps {
  leads: Lead[];
}

export default function LeadsDashboard({ leads }: LeadsDashboardProps) {
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCopy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.refresh();
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between selection:bg-black selection:text-white font-sans text-zinc-900">
      {/* Top Header / Navigation */}
      <nav className="w-full px-6 md:px-12 py-8 flex justify-between items-center border-b border-zinc-100">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-zinc-900 hover:opacity-70 transition-opacity font-black text-lg tracking-[0.1em] uppercase"
          >
            ard.dev
          </Link>
          <span className="h-4 w-px bg-zinc-200 hidden sm:inline-block"></span>
          <span className="text-[10px] text-zinc-400 font-black tracking-[0.2em] uppercase hidden sm:inline-block">
            Submissions
          </span>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
        >
          <span>{isLoggingOut ? "Exiting…" : "Log Out"}</span>
          <LogOut size={14} />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 py-12">
        {/* Page title and stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold block mb-1">
              Admin Overview
            </span>
            <h1 className="text-4xl md:text-5xl uppercase font-black tracking-tight leading-none text-zinc-900">
              Form Submissions
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-zinc-50 px-4 py-3 rounded-lg border border-zinc-100 self-start sm:self-auto">
            <FileSpreadsheet size={18} className="text-zinc-400" />
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block leading-none mb-1">
                Total Leads
              </span>
              <span className="text-lg font-black text-zinc-900 leading-none">
                {leads.length}
              </span>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        {leads.length === 0 ? (
          <div className="w-full py-20 border border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="text-zinc-300 text-5xl mb-4 font-light">^-^</span>
            <p className="text-zinc-500 font-medium text-lg uppercase tracking-wide">
              No submissions found
            </p>
            <p className="text-zinc-400 text-sm mt-1">
              New submissions will appear here once users submit the contact form.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-hidden border border-zinc-200 rounded-xl shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                      Requested Service / Topic
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {leads.map((lead, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-5 text-sm text-zinc-500 font-medium">
                        {formatDate(lead.timestamp)}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-zinc-900">
                        <span className="inline-block px-2.5 py-1 rounded bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider">
                          {lead.topic}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-zinc-900 font-bold select-all">
                        {lead.email}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleCopy(lead.email)}
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                        >
                          {copiedEmail === lead.email ? (
                            <>
                              <Check size={13} className="text-green-600" />
                              <span className="text-green-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden divide-y divide-zinc-200 bg-white">
              {leads.map((lead, idx) => (
                <div key={idx} className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="inline-block px-2.5 py-1 rounded bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider">
                      {lead.topic}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {formatDate(lead.timestamp)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-black tracking-widest uppercase block mb-0.5">
                      Email Address
                    </span>
                    <p className="text-base text-zinc-900 font-bold break-all select-all">
                      {lead.email}
                    </p>
                  </div>
                  <div className="self-end">
                    <button
                      onClick={() => handleCopy(lead.email)}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      {copiedEmail === lead.email ? (
                        <>
                          <Check size={13} className="text-green-600" />
                          <span className="text-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-100 px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium tracking-wider uppercase">
        <span>© {new Date().getFullYear()} ard.dev</span>
        <span>Secure Dashboard</span>
      </footer>
    </div>
  );
}
