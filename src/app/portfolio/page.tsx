"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ProjectsSection from "@/components/ProjectsSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import TextType from "@/components/TextType";

export default function PortfolioPage() {
  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ME", href: "/#about" },
    { label: "PORTFOLIO", href: "/portfolio" },
    { label: "SERVICES", href: "/#services" },
    { label: "CONTACT", href: "/#get-in-touch" },
  ];

  const mainRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const imagesListRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const projectImages = [
    {
      file: "broskie.png",
      title: "BROSKIE.AI",
      desc: "A full-stack job application platform that combines high-fidelity AI agents with a robust recruitment portal to help users land their dream roles with zero manual effort.",
      features: ["Autonomous Job Agents", "Dynamic Resume Tailoring", "HR Control Center", "Intelligent Matching"],
      url: "https://broskie-ai-gtic.vercel.app/",
    },
    {
      file: "ratnadipa-port.png",
      title: "RATNADIPA",
      desc: "A premium portfolio built for content creator Ratnadipa, focusing on high-impact visual storytelling and personal branding.",
      features: ["Visual Storytelling", "High-Impact Design", "Personal Branding", "Content Focused"],
      url: "https://ratnadipa-portfolio-m9l9.vercel.app/",
    },
    {
      file: "zero-ui2.png",
      title: "ZERO UI",
      desc: "An open-source React component library built for speed and aesthetics.",
      features: ["Lightweight", "Accessible components", "Theming & tokens"],
      url: "https://zeroui.vercel.app",
    },
    {
      file: "kryptos.png",
      title: "KRYPTOS",
      desc: "The only platform you need to decide about a web3 wallet",
      features: ["Secure key management", "Multi-chain support", "Simple UX"],
      url: "#",
    },
    {
      file: "signifiya.png",
      title: "SIGNIFIYA'26",
      desc: "SOET's most awaited annual techfest",
      features: ["Event schedules", "Speaker profiles", "Live updates"],
      url: "https://signifiya.in",
    },
    {
      file: "aura.png",
      title: "AURA",
      desc: "Adamas University's personal student guide rag bot",
      features: ["Campus maps", "Personalized tips", "Offline support"],
      url: "https://aura-au-bot.vercel.app",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!mainRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });

    // Pin the right/details column and animate left images in sequence driven by page scroll
    if (sectionRef.current && detailsRef.current && imagesListRef.current) {
      const items = Array.from(imagesListRef.current.querySelectorAll('.project-item')) as HTMLElement[];
      if (items.length) {
        // keep images fully opaque; only animate vertical position
        gsap.set(items, { opacity: 1, y: 40 });

        const total = imagesListRef.current.scrollHeight || 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${total}`,
            scrub: true,
            pin: detailsRef.current,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(items, { y: 40 }, { y: 0, stagger: 1, ease: 'none' }, 0);

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }
    }

    return () => {};
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen w-full bg-white">
      <header className="w-full fixed top-0 left-0 z-50 bg-white md:bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-100 min-h-[88px] md:min-h-[74px]">
        <nav className="max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-9 flex items-center relative">
          {/* Mobile hamburger on the left */}
          <div className="md:hidden absolute left-6 top-1/2 transform -translate-y-1/2">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Centered desktop links (preserve original sizes and spacing) */}
          <div className="absolute left-0 right-0 hidden md:flex items-center justify-center">
            <div className="flex items-center gap-53">
              {navItems.map((n) => (
                <Link key={n.label} href={n.href} className="uppercase text-3xl font-black tracking-wide text-black">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="absolute left-0 top-full w-full bg-white shadow-md md:hidden z-50">
              <div className="flex flex-col items-center py-4 gap-4">
                {navItems.map((n) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="uppercase text-2xl font-bold tracking-wide text-black"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="pt-0">
        {/* Projects two-column layout (images left, details right) */}
        <section ref={sectionRef} className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="w-full flex flex-col md:flex-row gap-8 items-start">
            {/* Left: vertical list of images (scrollable on md+) */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-6 md:px-0 md:pl-0 md:pr-0 box-border">
              <div ref={imagesListRef} className="w-full flex flex-col items-start gap-6 md:px-0 md:py-4 mt-14 md:mt-10">
              {projectImages.map((p, i) => (
                <div key={p.file} className="w-full project-item">
                  <button
                    type="button"
                    onClick={() => {
                      // ensure click updates index
                      // eslint-disable-next-line no-console
                      console.log('project click', i);
                      setActiveIndex(i);
                    }}
                    aria-pressed={i === activeIndex}
                    className={`w-full md:w-full max-w-[900px] transition-transform duration-200 ${
                      i === activeIndex ? "md:scale-105 md:shadow-2xl md:opacity-100" : "md:scale-95 md:opacity-70"
                    } cursor-pointer`}
                  >
                    <div className="shadow-xl rounded-3xl">
                      <Image
                        src={`/projects/${p.file}`}
                        alt={p.title}
                        width={1600}
                        height={1000}
                        className="w-full h-auto rounded-3xl"
                      />
                    </div>
                  </button>

                  {/* Mobile: show project details under each image */}
                  <div className="md:hidden mt-4 px-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold uppercase">{p.title}</h3>
                      <span className="text-sm text-zinc-500">{`${i + 1}/${projectImages.length}`}</span>
                    </div>
                    <p className="text-sm text-zinc-700 mt-2">{p.desc}</p>
                    {p.url && p.url !== "#" && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-black border-b-2 border-black pb-0.5 hover:opacity-70 transition-opacity"
                      >
                        Visit Project
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                    {p.features && (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {p.features.map((f, idx) => (
                          <li key={idx} className="text-xs bg-zinc-100 text-zinc-800 px-2 py-1 rounded">
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                    {i < projectImages.length - 1 && (
                      <div className="w-full h-px bg-zinc-200 my-4 md:my-6 rounded" />
                    )}
                </div>
              ))}
              </div>
            </div>

            {/* Right: project details area (desktop only) */}
            <div ref={detailsRef} className="hidden md:block md:w-1/2 pr-4 md:mt-10 md:sticky md:top-20 md:self-start z-10">
              <div className="max-w-xl">
                  <div className="flex items-baseline gap-4 mb-4">
                    <h2 className="text-4xl font-black uppercase m-0">{projectImages[activeIndex].title}</h2>
                    <span className="text-sm md:text-base text-zinc-500 font-medium">{`${activeIndex + 1}/${projectImages.length}`}</span>
                  </div>
                  <p className="text-base text-zinc-700 mb-6">{projectImages[activeIndex].desc}</p>

                  {projectImages[activeIndex].url && projectImages[activeIndex].url !== "#" && (
                    <a
                      href={projectImages[activeIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 mb-8 text-lg font-black text-black border-b-4 border-black pb-1 hover:opacity-70 transition-opacity"
                    >
                      VISIT PROJECT
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}

                  {/* Project features list */}
                  {projectImages[activeIndex].features && (
                    <div className="mb-6">
                      <h3 className="text-sm uppercase text-zinc-500 mb-2">Project Features</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {projectImages[activeIndex].features.map((f, idx) => (
                          <li key={idx} className="text-sm text-zinc-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-900 inline-block" aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
            </div>
          </div>
        </section>

        <div className="mt-40 w-full">
          <ConnectSection />
          <section className="relative z-10 w-full bg-white py-4 md:py-6 flex items-center justify-center mb-50 -mt-50">
          <TextType
            text={["LET'S MAKE DESIGN", "YOU WANT TO CLICK"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="text-4xl md:text-6xl lg:text-9xl uppercase font-semibold text-center text-zinc-900 px-4"
          />
        </section>

          <Footer />
                </div>
      </div>
    </main>
  );
}
