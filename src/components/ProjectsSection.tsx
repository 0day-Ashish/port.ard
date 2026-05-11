"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".projects-heading span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 80%",
        },
      });

      // Card staggered entrance
      gsap.from(".project-card-wrapper", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full bg-white py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="projects-heading mb-16 md:mb-24">
          <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase text-black">
            <span className="block">Selected</span>
            <span className="block">Works</span>
          </h2>
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-zinc-500 text-lg md:text-xl max-w-md font-medium">
              A curated collection of digital experiences built with precision and passion.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-zinc-400 uppercase">
              <span className="w-12 h-[1px] bg-zinc-200"></span>
              {projects.length} PROJECTS
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="project-card-wrapper group">
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 mb-6">
                {/* Image Layer */}
                <Link href={`/projects/${project.slug}`} data-cursor="project" className="absolute inset-0 z-10 block">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-transparent transition-colors duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-2xl">
                        <ArrowUpRight size={32} />
                      </div>
                      <span className="text-white font-bold uppercase tracking-widest text-xs drop-shadow-md">View Details</span>
                    </div>
                  </div>
                </Link>

                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-black uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>

                {/* External Links on Card */}
                <div className="absolute top-6 right-6 z-20 flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
                    title="GitHub Repository"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
                    title="Live Website"
                  >
                    <Globe size={18} />
                  </a>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-red-600 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-1">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 py-1 border border-zinc-100 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
