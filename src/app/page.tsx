"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { audioManager } from "@/lib/audio";
import gsap from "gsap";
import ScrambledText from "@/components/ScrambledText";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ConnectSection from "@/components/ConnectSection";
import ManifestoSection from "@/components/ManifestoSection";
import TechStackSection from "@/components/TechStackSection";
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
        <h1 className="text-[10vw] leading-[0.8] flex flex-col w-full tracking-[-0.05em] uppercase m-0 p-0 font-black">
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
  const [volume, setVolume] = useState<number>(0.15);
  const navItems = ["HOME", "ME", "PORTFOLIO", "SERVICES", "GET IN TOUCH"];

  // map nav labels to section anchors
  const navMap: Record<string, string> = {
    HOME: "#home",
    ME: "#about",
    PORTFOLIO: "/portfolio",
    SERVICES: "#services",
    "GET IN TOUCH": "#get-in-touch",
  };

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

  useEffect(() => {
    // initialize slider from audio manager (if audio already initialized)
    try {
      const v = audioManager.getVolume();
      setVolume(v || 0.15);
    } catch (e) {
      setVolume(0.15);
    }
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#111] text-white transition-opacity duration-800 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
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
            <div className="absolute inset-0 w-screen pointer-events-none">
              <HeroText color="text-white" startAnimate={startAnimate} />
            </div>

            <nav className="absolute bottom-12 right-12 z-50 flex flex-col items-end gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={navMap[item] ?? `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white text-2xl font-bold transition-opacity hover:opacity-70 text-right uppercase"
                >
                  <ScrambledText text={item} />
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side: Bio content */}
          <div className="relative h-[40vh] md:h-screen md:w-1/2 flex flex-col justify-start pt-[25vh] md:pt-[35vh] items-end pr-2 md:pr-4 pl-4 md:pl-0 z-20">
            <div className="max-w-md flex flex-col items-start gap-4">
                <div className="mt-3 md:mt-[3em]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)] block animate-pulse-glow"></span>
              </div>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium text-left">
                I'm Ashish . <br />
                I build high-performing websites for people<br />
                that launch fast, look premium, and convert with impact.
              </p>
                <div className="mt-2 md:mt-4 flex items-center gap-3">
                <span className="text-sm text-zinc-400">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    const v = Number((e.target as HTMLInputElement).value);
                    console.debug("volume slider change ->", v);
                    setVolume(v);
                    audioManager.setVolume(v);
                  }}
                  className="volume-slider w-48 md:w-64 accent-red-600"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ManifestoSection />
        <TechStackSection />
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
      </main>
    </>
  );
}
