"use client";

import { useState } from "react";

const topics = [
  "New project",
  "Collaboration",
  "General inquiry",
  "Other",
];

const ConnectSection = () => {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section
      id="get-in-touch"
      className="relative z-10 w-full min-h-screen bg-white flex flex-col justify-center"
    >
      <div className="px-8 md:px-16 py-16 md:py-24 max-w-6xl mx-auto w-full">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: Connect label + LET'S TALK ABOUT + dropdown */}
          <div className="flex flex-col gap-6">
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">
              Connect
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-zinc-900">
              Let&apos;s talk about
            </h2>
            <div className="relative mt-2">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-transparent text-zinc-900 font-medium text-base md:text-lg appearance-none cursor-pointer pr-8 py-3 border-0 border-b border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-0"
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
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-zinc-900 md:mt-10">
              My email to contact
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-end mt-2">
              <div className="flex-1 min-w-0 border-b border-zinc-300 focus-within:border-zinc-900 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-zinc-900 font-medium text-base md:text-lg py-3 border-0 focus:outline-none focus:ring-0 placeholder:text-zinc-400"
                  aria-label="Your email"
                />
              </div>
              <button
                type="button"
                className="shrink-0 flex items-center gap-2 text-zinc-900 font-black uppercase tracking-tight text-sm md:text-base hover:opacity-70 transition-opacity py-3 border-b border-transparent hover:border-zinc-900"
                aria-label="Submit design request"
              >
                Make design
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
