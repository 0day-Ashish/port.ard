"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "WEB DESIGN",
    items: [
      "Web or mobile wireframes",
      "Interactive prototypes",
      "Full UI design in Figma",
      "Design system (typography, colors, components)",
      "Developer-ready handoff files",
    ],
  },
  {
    title: "UX/UI DESIGN",
    items: [
      "Competitive & market research",
      "User flows and product logic definition",
      "UX architecture for mobile and desktop apps",
      "Research-driven prototyping",
      "UX testing & scalable UI design for long-term growth",
    ],
  },
  {
    title: "DEVELOPMENT",
    items: [
      "Full-cycle website development (React, Next.js)",
      "Smooth animations & refined micro-interactions",
      "High performance and SEO-friendly foundations",
      "CMS setup + optional ongoing support",
      "End-to-end guidance from start to launch",
    ],
  },
  {
    title: "CLIENT ZEN MODE",
    items: [
      "Clean structure and maintainable code",
      "Easy-to-manage backend and content",
      "Product confidence with on-time delivery",
      "Clear communication and iterative feedback",
      "Launch support and handoff documentation",
    ],
  },
];

const NUM_CARDS = 4;
const CARD_HEIGHT_VH = 75;
const COLUMN_HEIGHT_VH = NUM_CARDS * CARD_HEIGHT_VH;
// Small viewport height so column scrolls well past the last card
const VIEWPORT_CONTENT_VH = 60;
// Extra push so last card is fully off-screen before Connect section
const EXTRA_PUSH_VH = 50;
const SECTION_HEIGHT_VH = COLUMN_HEIGHT_VH + 120;

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || !cardsColumnRef.current)
      return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const cardsColumn = cardsColumnRef.current;

    const maxTranslateVh = Math.max(0, COLUMN_HEIGHT_VH - VIEWPORT_CONTENT_VH);
    const totalTranslateVh = maxTranslateVh + EXTRA_PUSH_VH;

    // Single ScrollTrigger: pin the viewport and scrub the cards column (keeps them in sync)
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: pin,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const y = -progress * totalTranslateVh;
        gsap.set(cardsColumn, { y: `${y}vh` });
      },
    });

    // Refresh after layout so Lenis + ScrollTrigger positions are correct
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 150);

    return () => {
      clearTimeout(t);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white z-0"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div
        ref={pinRef}
        className="relative w-full flex flex-col bg-white"
        style={{ height: "100vh" }}
      >
        <header className="shrink-0 border-b border-black px-8 md:px-16 py-6 md:py-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black">
            Services
          </h2>
        </header>

        <div
          className="flex-1 overflow-hidden"
          style={{ minHeight: 0 }}
        >
          <div
            ref={cardsColumnRef}
            className="w-full will-change-transform border-t border-black"
            style={{ height: `${COLUMN_HEIGHT_VH}vh` }}
          >
            {services.map((service, i) => (
              <div
                key={service.title}
                className="shrink-0 border-b border-black bg-white flex flex-col justify-center items-center px-8 md:px-16"
                style={{ height: `${CARD_HEIGHT_VH}vh`, paddingTop: "8vh", paddingBottom: "8vh" }}
              >
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black text-center">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
