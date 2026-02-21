"use client";

import { useEffect, useState } from "react";

const MARQUEE_TEXT = "© ard.dev,  2025–2026 ";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 w-full min-h-[36vh] bg-zinc-950 text-white flex flex-col">
      {/* Top bar: location + time */}
      <div className="flex justify-between items-center px-8 md:px-16 py-5 md:py-6 text-sm text-white/70">
        <span>Located in India</span>
        {time && <span>{time}</span>}
      </div>

      {/* Middle: contact links — Telegram left, Email center, LinkedIn right */}
      <div className="flex flex-1 items-center justify-between px-8 md:px-16 py-12 md:py-16 w-full">
        <a
          href="https://t.me/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black uppercase tracking-tight text-white hover:opacity-70 transition-opacity text-xl md:text-2xl lg:text-3xl"
        >
          Telegram
        </a>
        <a
          href="mailto:hello@ard.dev"
          className="font-black uppercase tracking-tight text-white hover:opacity-70 transition-opacity text-xl md:text-2xl lg:text-3xl"
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black uppercase tracking-tight text-white hover:opacity-70 transition-opacity text-xl md:text-2xl lg:text-3xl"
        >
          LinkedIn
        </a>
      </div>

      {/* Bottom: auto-moving marquee */}
      <div className="overflow-hidden shrink-0">
        <div className="flex py-4 md:py-6 marquee-track">
          <span className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black  text-base md:text-3xl lg:text-5xl text-white/90 whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
          <span
            className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black text-base md:text-lg lg:text-5xl text-white/90 whitespace-nowrap"
            aria-hidden
          >
            {[...Array(8)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
