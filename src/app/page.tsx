"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import gsap from "gsap";
import ScrambledText from "@/components/ScrambledText";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ConnectSection from "@/components/ConnectSection";
import TextType from "@/components/TextType";
import Footer from "@/components/Footer";

// Defined OUTSIDE Home so React never unmounts/remounts it on state changes
const HeroText = ({
  color,
  className = "",
  startAnimate,
}: {
  color: string;
  className?: string;
  startAnimate: boolean;
}) => {
  useEffect(() => {
    if (!startAnimate) return;
    gsap.fromTo(
      `.developer-text${color === "text-white" ? "-white" : "-black"}`,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
    );
  }, [startAnimate, color]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-start pt-0 ${color} ${className}`}
    >
      <div className="w-full px-4">
        <h1 className="text-[10vw] leading-[0.8] flex flex-col w-full tracking-[-0.05em] uppercase m-0 p-0 font-[900]">
          <span className="block text-right mr-5">DESIGNER</span>
          <div className="flex justify-end w-full">
            <span
              className={`${color === "text-white" ? "developer-text-white" : "developer-text-black"} text-[10vw] mt-2 md:ml-10`}
              style={{ opacity: 0 }}
            >
              {"& DEVELOPER"}
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [startAnimate, setStartAnimate] = useState(false);
  const navItems = ["HOME", "ME", "PORTFOLIO", "SERVICES", "GET IN TOUCH"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setLoading(false);
        setStartAnimate(true);
      }, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111] text-white transition-opacity duration-800 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
        >
          <div className="text-sm tracking-[0.3em] opacity-80 uppercase animate-fade-up">
            ard.dev © est. 2026
          </div>
        </div>
      )}

      <main className="relative min-h-screen w-full bg-white top-0 left-0">
        {/* 1. Base Layer: Black text visible on the right side */}
        <div className="absolute inset-0 z-0">
          <HeroText color="text-black" startAnimate={startAnimate} />
        </div>

        {/* 2. Split Layout Container */}
        <div className="relative flex min-h-screen w-full flex-col md:flex-row">
          {/* Left Side: Photo with Clipped White Text */}
          <div className="relative h-[60vh] md:h-screen md:w-1/2 overflow-hidden z-10">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/me.JPG"
                alt="Hero Portrait"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>

            {/* White Text precisely clipped to this 50vw container */}
            <div className="absolute inset-0 w-[100vw] pointer-events-none">
              <HeroText color="text-white" startAnimate={startAnimate} />
            </div>

            <nav className="absolute bottom-12 right-12 z-50 flex flex-col items-end gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white text-2xl font-bold transition-opacity hover:opacity-70 text-right uppercase"
                >
                  <ScrambledText text={item} />
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side: Bio content */}
          <div className="relative h-[40vh] md:h-screen md:w-1/2 flex flex-col justify-start pt-[25vh] md:pt-[35vh] items-end pr-2 md:pr-4 z-20">
            <div className="max-w-md flex items-start gap-4">
              <div className="mt-[3em]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)] block animate-pulse-glow"></span>
              </div>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium text-left">
                I'm Ashish . <br />
                I build high-performing websites for people<br />
                that launch fast, look premium, and convert with impact.
              </p>
            </div>
          </div>
        </div>

        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ConnectSection />
        <section className="relative z-10 w-full bg-white py-20 md:py-28 flex items-center justify-center">
          <TextType
            text={["LET'S MAKE DESIGN", "YOU WANT TO CLICK"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-center text-zinc-900 px-4"
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
