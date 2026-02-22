"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
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
    { label: "GET IN TOUCH", href: "/#get-in-touch" },
  ];

  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen w-full bg-white">
      <header className="w-full  bg-white/95 backdrop-blur-sm fixed top-0 left-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-center gap-53">
          {navItems.map((n) => (
            <Link key={n.label} href={n.href} className="uppercase text-3xl font-black tracking-wide text-black">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="pt-20">
        <ProjectsSection />
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
    </main>
  );
}
