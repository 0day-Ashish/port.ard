"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CERTIFICATIONS = [
  { year: "2026", name: "Claude 101 Certification", issuer: "Anthropic" },
  { year: "2025", name: "Frontend Developer (Professional)", issuer: "HackerRank" },
  { year: "2026", name: "Midnight Chain ", issuer: "RiseIn" },
  { year: "2025", name: "Blockchain & Cryptocurrency", issuer: "IIT Bombay" },
  { year: "2025", name: "Game Development", issuer: "IIT Bombay" },
];

const CertificationsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;
    if (typeof window === "undefined") return;
    
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${container.offsetHeight - 200}`,
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    // Staggered reveal for list items
    gsap.fromTo(
      ".cert-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cert-list",
          start: "top 80%",
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="certifications" ref={containerRef} className="w-full bg-white py-8 md:py-12 mb-70">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-4">
            <div ref={headingRef} className="self-start z-10">
              <h2 className="text-4xl md:text-4xl lg:text-6xl font-black uppercase text-zinc-900 text-left">
                Certifications
              </h2>
              <p className="mt-6 text-sm text-zinc-500 max-w-md mx-auto md:mx-0">
                A selection of professional certifications and specializations that validate my technical expertise and commitment to design excellence.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 flex justify-center md:justify-end">
            <div className="cert-list w-full md:w-3/4 lg:w-2/3 border-t border-b border-zinc-200 mx-auto md:mx-0">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={cert.name + i}
                  className={`cert-item flex flex-col md:flex-row items-center md:items-center py-8 px-4 ${
                    i < CERTIFICATIONS.length - 1 ? "border-b border-zinc-200" : ""
                  } group transition-colors hover:bg-zinc-50`}
                >
                  <div className="hidden md:block text-sm text-zinc-400 w-12 text-left font-mono">
                    {cert.year}
                  </div>
                  <div className="flex-1 text-center md:text-left md:pl-8">
                    <div className="text-base md:text-lg font-bold text-zinc-900 uppercase tracking-tight">
                      {cert.name}
                    </div>
                  </div>
                  <div className="hidden md:block text-sm text-zinc-400 w-48 text-right italic">
                    {cert.issuer}
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden mt-2 flex flex-col items-center gap-1 text-sm text-zinc-400">
                    <div className="font-mono">{cert.year}</div>
                    <div className="italic">{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
