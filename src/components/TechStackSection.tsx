"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TECHS = [
  { left: "6+", name: "React", right: "Frontend" },
  { left: "6+", name: "Next.js", right: "Framework" },
  { left: "5+", name: "TypeScript", right: "Language" },
  { left: "6+", name: "Tailwind CSS", right: "Styling" },
  { left: "4+", name: "Node.js", right: "Backend" },
  { left: "3+", name: "GraphQL", right: "API" },
  { left: "3+", name: "Vercel", right: "Hosting" },
  { left: "2+", name: "GSAP", right: "Animations" },
  { left: "3+", name: "Framer Motion", right: "Animations" },
  { left: "2+", name: "Python", right: "Backend" },
  { left: "3+", name: "Render", right: "Hosting" },
  { left: "3+", name: "Railway", right: "Hosting" },
  { left: "2+", name: "Three.js", right: "Animations" },
  { left: "3+", name: "PostgreSQL", right: "Database" },
  { left: "3+", name: "MongoDB", right: "Database" },
];

const TechStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;
    // only enable GSAP pinning on medium+ screens (disable on small/mobile)
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${container.offsetHeight}`,
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    // refresh in case layout changes (works with smooth scroll libs)
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-8 md:py-12 mb-70">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-13 md:col-span-4">
            <div ref={headingRef} className="self-start z-10">
              <h2 className="text-4xl md:text-4xl lg:text-6xl font-black uppercase text-zinc-900 text-left md:text-left">Tech Stack</h2>
              <p className="mt-6 text-sm text-zinc-500 max-w-md mx-auto md:mx-0">These are the primary tools and technologies I use to build performant, accessible, and delightful web experiences.</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 flex justify-center md:justify-end">
            <div className="tech-list w-full md:w-3/4 lg:w-2/3 border-t border-b border-zinc-200 mx-auto md:mx-0">
              {TECHS.map((t, i) => (
                <div
                  key={t.name + i}
                  className={`flex flex-col md:flex-row items-center md:items-center py-6 px-4 ${i < TECHS.length - 1 ? "border-b border-zinc-200" : ""}`}
                >
                  <div className="hidden md:block text-sm text-zinc-400 w-12 text-left">{t.left}</div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-base md:text-lg font-bold text-zinc-900">{t.name}</div>
                  </div>
                  <div className="hidden md:block text-sm text-zinc-400 w-36 text-right">{t.right}</div>

                  {/* Mobile: show left/right metadata below the name */}
                  <div className="md:hidden mt-2 flex justify-between w-full text-sm text-zinc-400 px-2">
                    <div className="text-left">{t.left}</div>
                    <div className="text-right">{t.right}</div>
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

export default TechStackSection;
