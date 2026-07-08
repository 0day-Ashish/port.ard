"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "./actions";
import Link from "next/link";
import { Copy, Check, LogOut, FileSpreadsheet, Eye, X, Calendar, Instagram } from "lucide-react";
import { ManagerApplication } from "./page";

interface Lead {
  timestamp: string;
  topic: string;
  email: string;
}

interface LeadsDashboardProps {
  leads: Lead[];
  managerApplications: ManagerApplication[];
}

export default function LeadsDashboard({ leads, managerApplications }: LeadsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"contacts" | "managers">("contacts");
  const [selectedApp, setSelectedApp] = useState<ManagerApplication | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyHandle = async (handle: string) => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopiedHandle(handle);
      setTimeout(() => setCopiedHandle(null), 2000);
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

  const formatBirthdate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold block mb-1">
              Admin Overview
            </span>
            <h1 className="text-4xl md:text-5xl uppercase font-black tracking-tight leading-none text-zinc-900">
              Form Submissions
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Stat: Leads */}
            <div className="flex items-center gap-3 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-100 min-w-[130px]">
              <FileSpreadsheet size={18} className="text-zinc-400" />
              <div>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block leading-none mb-1">
                  Contact Leads
                </span>
                <span className="text-lg font-black text-zinc-900 leading-none">
                  {leads.length}
                </span>
              </div>
            </div>
            {/* Stat: Managers */}
            <div className="flex items-center gap-3 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-100 min-w-[150px]">
              <Instagram size={18} className="text-zinc-400" />
              <div>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block leading-none mb-1">
                  Manager Applicants
                </span>
                <span className="text-lg font-black text-zinc-900 leading-none">
                  {managerApplications.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex border-b border-zinc-200 mb-8">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`pb-4 px-6 font-black uppercase text-xs tracking-wider transition-colors cursor-pointer border-b-2 -mb-[2px] ${
              activeTab === "contacts"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Contact Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("managers")}
            className={`pb-4 px-6 font-black uppercase text-xs tracking-wider transition-colors cursor-pointer border-b-2 -mb-[2px] ${
              activeTab === "managers"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Manager Applications ({managerApplications.length})
          </button>
        </div>

        {/* ACTIVE TAB CONTENT */}
        {activeTab === "contacts" ? (
          /* TAB 1: CONTACT LEADS */
          leads.length === 0 ? (
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
            <div className="w-full overflow-hidden border border-zinc-200 rounded-xl shadow-sm bg-white">
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
                      <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
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
                            onClick={() => handleCopyEmail(lead.email)}
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
                        onClick={() => handleCopyEmail(lead.email)}
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
          )
        ) : (
          /* TAB 2: MANAGER APPLICATIONS */
          managerApplications.length === 0 ? (
            <div className="w-full py-20 border border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-zinc-300 text-5xl mb-4 font-light">^-^</span>
              <p className="text-zinc-500 font-medium text-lg uppercase tracking-wide">
                No applications found
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                Applicants who complete the manager form will show up here.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-hidden border border-zinc-200 rounded-xl shadow-sm bg-white">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200">
                      <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                        Name
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                        Instagram Handle
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">
                        Birthdate
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {managerApplications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm text-zinc-500 font-medium">
                          {formatDate(app.timestamp)}
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-zinc-900">
                          {app.name}
                        </td>
                        <td className="px-6 py-5 text-sm font-semibold text-zinc-900 select-all">
                          {app.instaHandle}
                        </td>
                        <td className="px-6 py-5 text-sm text-zinc-500">
                          {formatBirthdate(app.birthdate)}
                        </td>
                        <td className="px-6 py-5 text-right flex justify-end gap-3">
                          <button
                            onClick={() => handleCopyHandle(app.instaHandle)}
                            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                          >
                            {copiedHandle === app.instaHandle ? (
                              <Check size={12} className="text-green-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                            <span className={copiedHandle === app.instaHandle ? "text-green-600" : ""}>
                              {copiedHandle === app.instaHandle ? "Copied" : "Copy"}
                            </span>
                          </button>
                          <span className="text-zinc-200">|</span>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-900 hover:opacity-70 transition-opacity cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List View */}
              <div className="md:hidden divide-y divide-zinc-200 bg-white">
                {managerApplications.map((app, idx) => (
                  <div key={idx} className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {formatDate(app.timestamp)}
                      </span>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-zinc-900 hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>Details</span>
                      </button>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-400 font-black tracking-widest uppercase block mb-0.5">
                        Name
                      </span>
                      <p className="text-base text-zinc-900 font-bold">{app.name}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-zinc-400 font-black tracking-widest uppercase block mb-0.5">
                          Instagram
                        </span>
                        <p className="text-sm font-semibold text-zinc-900">{app.instaHandle}</p>
                      </div>
                      <button
                        onClick={() => handleCopyHandle(app.instaHandle)}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                      >
                        {copiedHandle === app.instaHandle ? (
                          <>
                            <Check size={12} className="text-green-600" />
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Handle</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </main>

      {/* DETAIL MODAL OVERLAY */}
      {selectedApp && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl flex flex-col border border-zinc-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <div>
                <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-1">
                  Applicant Details
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                  {selectedApp.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
              {/* Basic metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-zinc-100 pb-6">
                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-1">
                    Instagram Handle
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-zinc-900">{selectedApp.instaHandle}</span>
                    <button
                      onClick={() => handleCopyHandle(selectedApp.instaHandle)}
                      className="text-zinc-400 hover:text-zinc-900 transition-colors"
                      title="Copy Handle"
                    >
                      {copiedHandle === selectedApp.instaHandle ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-1">
                    Birthdate
                  </span>
                  <span className="text-sm font-medium text-zinc-900 flex items-center gap-1.5">
                    <Calendar size={14} className="text-zinc-400" />
                    {formatBirthdate(selectedApp.birthdate)}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-1">
                    Applied On
                  </span>
                  <span className="text-sm font-medium text-zinc-500">
                    {formatDate(selectedApp.timestamp)}
                  </span>
                </div>
              </div>

              {/* Previous Works */}
              <div>
                <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-2">
                  Previous Works
                </span>
                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl text-sm md:text-base text-zinc-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedApp.previousWorks || "None provided."}
                </div>
              </div>

              {/* Goals & Hobbies */}
              <div>
                <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold block mb-2">
                  Goals & Hobbies
                </span>
                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl text-sm md:text-base text-zinc-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedApp.goalsHobbies}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-zinc-100 px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium tracking-wider uppercase">
        <span>© {new Date().getFullYear()} ard.dev</span>
        <span>Secure Dashboard</span>
      </footer>
    </div>
  );
}
