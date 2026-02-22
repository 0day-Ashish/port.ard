"use client";

import { useState } from "react";

const topics = [
  "Web Development",
  "Collaboration",
  "App Development",
  "Other",
];

const ConnectSection = () => {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <section
      id="get-in-touch"
      className="relative z-10 w-full min-h-screen bg-white flex flex-col justify-start"
    >
      <div className="px-8 md:px-12 pt-8 md:pt-12 max-w-6xl ml-4 md:ml-16 w-full">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_60%] items-start">
          {/* Left: Connect label + LET'S TALK ABOUT + dropdown */}
          <div className="flex flex-col -mt-6 md:-mt-12">
            <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">
              Connect
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-6xl uppercase font-black text-zinc-900">
              Let&apos;s talk about
            </h2>
            <div className="relative mt-2">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-transparent text-zinc-900 font-medium text-lg md:text-xl appearance-none cursor-pointer pr-8 py-4 border-0 border-b border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-0"
                aria-label="Select topic"
              >
                <option value="" disabled>
                  Select...
                </option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Right: MY EMAIL TO CONTACT + email input + MAKE DESIGN → */}
          <div className="flex flex-col gap-6 mt-10 md:mt-42">
            <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase font-black text-zinc-900 md:mt-10">
              My email to contact
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-end mt-2">
              <div className="flex-1 min-w-0 border-b border-zinc-300 focus-within:border-zinc-900 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-zinc-900 font-medium text-lg md:text-xl py-4 border-0 focus:outline-none focus:ring-0 placeholder:text-zinc-400"
                  aria-label="Your email"
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  setStatus(null);
                  if (!topic) return setStatus("Please select a topic");
                  if (!email) return setStatus("Please enter your email");
                  setLoading(true);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ topic, email }),
                    });
                    const data = await res.json();
                    if (data.ok) {
                      setStatus("Sent — thanks!");
                      setTopic("");
                      setEmail("");
                    } else {
                      setStatus(data.error || "Failed to send");
                    }
                  } catch (err) {
                    setStatus("Network error");
                  } finally {
                    setLoading(false);
                  }
                }}
                style={{ minWidth: 180 }}
                className="shrink-0 inline-flex items-center gap-3 text-zinc-900 font-black uppercase text-xl md:text-base px-6 py-3 whitespace-nowrap"
                aria-label="Submit design request"
                disabled={loading}
              >
                <span>{loading ? "Sending…" : "Make design"}</span>
                <span aria-hidden className="text-2xl leading-none">→</span>
              </button>
              {status && <div className="text-sm text-zinc-500 ml-4">{status}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
