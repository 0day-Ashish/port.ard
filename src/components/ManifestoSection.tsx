"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = ["JACK", "OF", "ALL.", "TRADES", "MASTER", "OF", "NONE"];

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<HTMLDivElement[]>([]);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const scatterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // clear any previous refs
    wordRefs.current = wordRefs.current.slice(0, WORDS.length);

    const endPercent = WORDS.length * 30; // shorten pinned scroll distance to avoid large empty area
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${endPercent}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // prepare words: from opacity 0, y: -50 to opacity 1, y:0
    tl.fromTo(
      wordRefs.current,
      { opacity: 0, y: -80 },
      { opacity: 1, y: 0, stagger: 1, ease: "none" },
      0
    );

    // animate counter into view together with the first word and fade out near the end
    if (counterRef.current) {
      // start hidden
      gsap.set(counterRef.current, { opacity: 0, scale: 0.98 });

      // animate counter in at the same time as words timeline start
      tl.fromTo(
        counterRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
        0
      );
    }

    // scatter images animation: pick up elements with class .manifesto-scatter
    const scatters = gsap.utils.toArray<HTMLImageElement>(".manifesto-scatter");
    if (scatters.length) {
      gsap.set(scatters, { opacity: 0, y: 10, scale: 0.98 });
      tl.fromTo(
        scatters,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, ease: "power2.out" },
        0.05
      );
    }

    // fade out counter + scatters when progress nears completion
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${endPercent}%`,
      scrub: true,
      onUpdate: (self) => {
        if (counterRef.current) {
          if (self.progress >= 0.95) {
            gsap.to(counterRef.current, { opacity: 0, duration: 0.3, overwrite: true });
          } else {
            gsap.to(counterRef.current, { opacity: 1, duration: 0.25, overwrite: true });
          }
        }
        if (scatters.length) {
          if (self.progress >= 0.95) {
            gsap.to(scatters, { opacity: 0, duration: 0.3, stagger: 0.02, overwrite: true });
            gsap.to(scatters, { y: -10, duration: 0.4, overwrite: true });
          } else {
            gsap.to(scatters, { opacity: 1, duration: 0.25, stagger: 0.02, overwrite: true });
            gsap.to(scatters, { y: 0, duration: 0.4, overwrite: true });
          }
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  // images to scatter under the counter (public/assets)
  const SCATTER = [
    "me1.png",
    "me2.png",
    "me3.png",
    "me4.png",
    "me5.png",
    "me6.png",
    "me7.png",
    "me8.png",
    "me9.png",
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      <div style={{ height: `${WORDS.length * 30}vh` }}>
        <div className="sticky top-0 h-screen w-full flex items-center">
          <div className="w-full px-4 md:px-8">
            <div className="w-full h-[30vh] md:h-[40vh] lg:h-[36vh] flex flex-col justify-center gap-2 md:gap-3 lg:gap-4">
              {WORDS.map((word, i) => (
                <div
                  key={word + i}
                  ref={(el) => {
                    if (!el) return;
                    wordRefs.current[i] = el;
                  }}
                  className="flex items-center justify-start opacity-0"
                  style={{ transform: "translateY(-40px)" }}
                >
                  <h1 className="m-0 text-[10vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.9] font-black uppercase tracking-[-0.03em] text-zinc-900">
                    {word}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
          {/* right-side counter image: fixed on larger screens while the section is pinned */}
          <div
            ref={counterRef}
            className="hidden md:block fixed right-10 lg:right-20 top-16 z-30 pointer-events-none"
            aria-hidden
          >
            <img
              src="https://count.getloli.com/@:0day-Ashish?theme=booru-koe&padding=4&offset=1&scale=1&align=top&pixelated=1&darkmode=auto"
              alt="contribution counter"
              className="w-56 md:w-72 lg:w-96 block"
            />
          </div>
          {/* scattered images container (fixed, positioned under the counter) */}
          <div  className="fixed z-20 pointer-events-none" style={{ right: '12rem', top: '16rem', width: '80rem', height: '28rem' }} aria-hidden>
            <div className="relative w-full h-full">
              {/* manually position a subset around the counter (increased sizes and horizontal spacing) */}
              <img src="/assets/me1.png" alt="me1" className="manifesto-scatter absolute" style={{ width: 160, right: -140, top: 64, transform: 'rotate(-8deg)' }} />
              <img src="/assets/me2.png" alt="me2" className="manifesto-scatter absolute" style={{ width: 140, right: -50, top: 274, transform: 'rotate(6deg)' }} />
              <img src="/assets/me3.png" alt="me3" className="manifesto-scatter absolute" style={{ width: 180, right: 10, top: 56, transform: 'rotate(-4deg)' }} />
              <img src="/assets/me4.png" alt="me4" className="manifesto-scatter absolute" style={{ width: 160, right: 200, top: 120, transform: 'rotate(8deg)' }} />
              <img src="/assets/me5.png" alt="me5" className="manifesto-scatter absolute" style={{ width: 140, right: 290, top: -45, transform: 'rotate(-12deg)' }} />
              <img src="/assets/me6.png" alt="me6" className="manifesto-scatter absolute" style={{ width: 156, right: 380, top: 64, transform: 'rotate(10deg)' }} />
              <img src="/assets/me7.png" alt="me7" className="manifesto-scatter absolute" style={{ width: 140, right: 470, top: 140, transform: 'rotate(-6deg)' }} />
            </div>
          </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
