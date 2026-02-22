"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "01",
    name: "ZERO UI",
    year: "2026",
    description: "An open-source React component library built for speed and aesthetics.",
    url: "https://zeroui.vercel.app",
    bgColor: "#111111",
  },
  {
    id: "02",
    name: "KRYPTOS",
    year: "2026",
    description: "The only platform you need to decide about a web3 wallet",
    url: "#",
    bgColor: "#1a1a1a",
  },
  {
    id: "03",
    name: "SIGNIFIYA'26",
    year: "2026",
    description: "SOET's most awaited annual techfest",
    url: "https://signifiya.in",
    bgColor: "#222222",
  },
  {
    id: "04",
    name: "AURA",
    year: "2026",
    description: "Adamas University's personal student guide rag bot",
    url: "https://aura-au-bot.vercel.app",
    bgColor: "#222222",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !rightPanelRef.current || !leftPanelRef.current) return;

    const vh = window.innerHeight;
    const totalHeight = projects.length * vh; // each project occupies 1 viewport height

    // Make the section tall enough to scroll through all project cards
    sectionRef.current.style.height = `${totalHeight}px`;

    // Make the right panel occupy the full stacked height so page scroll moves the cards
    rightPanelRef.current.style.position = "absolute";
    rightPanelRef.current.style.top = "0";
    rightPanelRef.current.style.right = "0";
    rightPanelRef.current.style.width = "50%";
    rightPanelRef.current.style.height = `${totalHeight}px`;
    rightPanelRef.current.style.overflow = "visible";

    // Pin the left panel for the duration of the projects scroll, then unpin
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalHeight - vh}`,
      pin: leftPanelRef.current,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        // Update the active index based on page scroll progress
        const progress = self.progress; // 0..1
        const idx = Math.round(progress * (projects.length - 1));
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /*
      The section itself is 100vh tall and acts as a container.
      Left column: static (never moves).
      Right column: overflow-y scroll + data-lenis-prevent so ONLY the right side scrolls,
                    completely independent of Lenis/page scroll.
    */
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-white"
      style={{ height: "100vh", zIndex: 10, overflow: "hidden" }}
    >
      {/* ── LEFT PANEL (static) ── */}
      <div
        ref={leftPanelRef}
        className="hidden md:flex absolute top-0 left-0 flex-col justify-between bg-white h-full"
        style={{ width: "50%", zIndex: 2 }}
      >
        <div className="px-8 md:px-16 py-12">
          <h2 className="text-[10vw] md:text-[7vw] leading-[0.9] font-black uppercase tracking-tighter text-black">
            SELECTED<br />WORKS
          </h2>
          <p className="mt-3 text-sm text-zinc-500 font-medium">
            Scroll through the projects on the right section
          </p>
        </div>

        <div className="px-8 md:px-16 pb-10 flex flex-col gap-1">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between transition-all duration-300"
              style={{
                opacity: i === activeIndex ? 1 : 0.3,
                fontWeight: i === activeIndex ? 900 : 500,
              }}
            >
              <span className="text-base uppercase tracking-wide text-black">
                {p.id} {p.name}
              </span>
              <span className="text-sm text-zinc-500">{p.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL (independent scroll) ── */}
      {/*
        data-lenis-prevent: Lenis will ignore scroll events on this element.
        overflow-y: scroll: native browser scroll takes over.
        scroll-snap makes each card snap into place for a premium feel.
      */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0"
        style={{
          width: "50%",
        }}
      >
        {/* Mobile heading */}
        <div className="md:hidden">
          <div className="px-8 pt-12 pb-6 bg-white">
            <h2 className="text-[14vw] leading-[0.9] font-black uppercase tracking-tighter text-black">
              SELECTED<br />WORKS
            </h2>
          </div>
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card relative overflow-hidden"
            style={{
              height: "100vh",
              background: project.bgColor,
            }}
          >
            {/* Number */}
            <div className="absolute top-8 left-8 text-white/40 text-sm font-mono">
              ({project.id})
            </div>

            {/* Arrow link */}
            <a
              href={project.url}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm
                         flex items-center justify-center text-white hover:bg-white hover:text-black
                         transition-all duration-300 z-10"
              aria-label={`View ${project.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Project info */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 text-white">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-mono">
                ard.dev
              </p>
              <h3 className="text-[12vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter mb-4">
                {project.name}
              </h3>
              <p className="text-white/60 text-sm max-w-xs leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Drop your image/video here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/10 text-xs uppercase tracking-widest select-none">
                [ drop image / video here ]
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
