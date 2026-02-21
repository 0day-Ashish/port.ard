"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const text =
  "For me, design means aesthetics, clean solutions, and attention to UX. Create fast. On time. On brief. Bring ideas and adjustments grounded in design principles. Typography and animation are my key tools to bring interfaces alive. Building my own projects and open to new collaborations.";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current || !containerRef.current) return;

    // Split text into character spans
    textRef.current.innerHTML = "";
    const characters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.opacity = "0.2";
      span.style.color = "#a1a1aa";
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      textRef.current!.appendChild(span);
      return span;
    });

    // Pin the container at the bottom-left while letters animate
    const pinST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: false,
    });

    // Animate letters from dim → black over the full scroll of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl.to(characters, {
      opacity: 1,
      color: "#000000",
      stagger: { each: 0.1, from: "start" },
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        const activeIndex = Math.floor(progress * characters.length);
        characters.forEach((span, i) => {
          if (i === activeIndex) {
            span.style.textShadow = "0 0 20px rgba(0,0,0,0.45)";
          } else if (Math.abs(i - activeIndex) < 5) {
            span.style.textShadow = "0 0 10px rgba(0,0,0,0.15)";
          } else {
            span.style.textShadow = "none";
          }
        });
      },
    });

    return () => {
      pinST.kill();
      tl.kill();
    };
  }, []);

  return (
    // 300vh gives the scroll room for the letter animation
    <section ref={sectionRef} className="relative w-full bg-white" style={{ height: "300vh" }}>
      {/* This container gets pinned by GSAP — sits at bottom-left of viewport */}
      <div
        ref={containerRef}
        className="w-full flex flex-col justify-end px-8 md:px-16 pb-6 md:pb-8"
        style={{ height: "100vh" }}
      >
        <div className="max-w-5xl">
          <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2 font-bold">
            Manifesto
          </p>
          <h2
            ref={textRef}
            className="text-[4.5vw] md:text-[2.5vw] leading-[1.15] font-black text-zinc-300"
          >
            {text}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
