"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

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

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const leftHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !leftPanelRef.current || !rightPanelRef.current) return;

    const vh = window.innerHeight;
    const totalHeight = projects.length * vh;
    const headerHeight = 80; // offset so pinned left panel sits below fixed header

    // set section and right panel sizes
    sectionRef.current.style.height = `${totalHeight}px`;
    rightPanelRef.current.style.position = "absolute";
    rightPanelRef.current.style.top = "0";
    rightPanelRef.current.style.right = "0";
    const isMobile = window.innerWidth < 768;
    // on mobile use full width so content doesn't appear clipped to the right half
    rightPanelRef.current.style.width = isMobile ? "100%" : "50%";
    rightPanelRef.current.style.height = `${totalHeight}px`;
    rightPanelRef.current.style.overflow = "visible";

    // ensure left panel is offset below the fixed header to avoid being covered
    leftPanelRef.current.style.top = `${headerHeight}px`;
    leftPanelRef.current.style.zIndex = "10";

    // entrance for left heading
    if (leftHeadingRef.current) {
      gsap.fromTo(leftHeadingRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 });
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: `top top+=${headerHeight}`,
      end: `+=${totalHeight - vh}`,
      pin: leftPanelRef.current,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (projects.length - 1));
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full bg-white" style={{ height: "100vh", zIndex: 10, overflow: "hidden", scrollMarginTop: "80px" }}>
      <div ref={leftPanelRef} className="hidden md:flex absolute top-0 left-0 flex-col justify-between bg-white h-full" style={{ width: "50%", zIndex: 2 }}>
        <div className="px-8 md:px-6 pt-6 pb-12">
          <h2 ref={leftHeadingRef} className="text-[10vw] md:text-[7vw] leading-[0.9] font-black uppercase tracking-tighter text-black opacity-0">
            SELECTED<br />WORKS
          </h2>
          <p className="mt-3 text-sm text-zinc-500 font-medium">Scroll through the projects on the right section</p>
        </div>

        <div className="px-8 md:px-16 pb-10 flex flex-col gap-1">
          {projects.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between transition-all duration-300" style={{ opacity: i === activeIndex ? 1 : 0.3, fontWeight: i === activeIndex ? 900 : 500 }}>
              <span className="text-base uppercase tracking-wide text-black">{p.id} {p.name}</span>
              <span className="text-sm text-zinc-500">{p.year}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={rightPanelRef} className="absolute top-0 right-0" style={{ width: "50%" }}>
        <div className="md:hidden">
          <div className="px-8 pb-6 bg-white">
            <h2 className="text-[14vw] leading-[0.9] font-black uppercase tracking-tighter text-black">SELECTED<br />WORKS</h2>
          </div>
        </div>

        {projects.map((project) => (
          <div key={project.id} className="project-card relative overflow-hidden h-[60vh] md:h-screen" style={{ background: project.bgColor }}>
            <div className="absolute top-8 left-8 text-white/40 text-sm font-mono">({project.id})</div>

            <a href={project.url} className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10" aria-label={`View ${project.name}`} target={project.url && project.url.startsWith("http") ? "_blank" : undefined} rel={project.url && project.url.startsWith("http") ? "noopener noreferrer" : undefined}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 text-white">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-mono">ard.dev</p>
              <h3 className="text-[12vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter mb-4">{project.name}</h3>
              <p className="text-white/60 text-sm max-w-xs leading-relaxed">{project.description}</p>
            </div>

            {/* image area */}
            <div className="absolute inset-0">
              <div data-cursor="project" className="absolute inset-0 group">
                <a href={project.url || '#'} aria-label={`Open ${project.name}`} className="absolute inset-0 z-20 block" target={project.url && project.url.startsWith("http") ? "_blank" : undefined} rel={project.url && project.url.startsWith("http") ? "noopener noreferrer" : undefined} />
                <div className="relative w-full h-full overflow-hidden">
                  {project.id === "01" && (
                    <Image src="/projects/zero-ui2.png" alt="Zero UI screenshot" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out" />
                  )}
                  {project.id === "02" && (
                    <Image src="/projects/kryptos.png" alt="Kryptos screenshot" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out" />
                  )}
                  {project.id === "03" && (
                    <Image src="/projects/signifiya.png" alt="Signifiya screenshot" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out" />
                  )}
                  {project.id === "04" && (
                    <Image src="/projects/aura.png" alt="Aura screenshot" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
