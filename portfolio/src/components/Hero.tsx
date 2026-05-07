import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    const chars = headlineRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.9,
        ease: 'power4.out',
      });
    }

    if (compositionRef.current) {
      gsap.to(compositionRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        yPercent: 10,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }
  }, { scope: containerRef });

  const splitChars = (text: string) =>
    text.split('').map((c, i) =>
      c === ' ' ? (
        <span key={i} className="inline-block w-[0.3em]" />
      ) : (
        <span key={i} className="inline-flex overflow-hidden">
          <span className="char inline-block">{c}</span>
        </span>
      )
    );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-bg text-fg"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.05] pointer-events-none" />
      {/* Subtle paper noise */}
      <div className="absolute inset-0 swiss-pattern-noise opacity-[0.04] pointer-events-none mix-blend-multiply" />

      {/* Top meta strip — flush to grid, aligned by columns */}
      <div className="relative z-10 grid grid-cols-12 border-b-2 border-border pt-20 md:pt-24 pb-4 px-6 md:px-10">
        <div className="col-span-6 md:col-span-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.25em] font-bold">
          <span className="text-accent">00 / Index</span>
          <span className="text-fg-subtle truncate"><span className="md:hidden">Cebu, PH</span><span className="hidden md:inline">Cebu · 10.31°N 123.89°E</span></span>
        </div>
        <div className="hidden md:flex col-span-3 flex-col gap-1 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
          <span>Edition</span>
          <span className="text-fg">Portfolio · Vol. 04 / 2026</span>
        </div>
        <div className="hidden md:flex col-span-3 flex-col gap-1 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
          <span>Issued</span>
          <span className="text-fg">May 2026</span>
        </div>
        <div className="col-span-6 md:col-span-3 flex md:justify-end items-start gap-2 text-[10px] uppercase tracking-[0.25em] font-bold min-w-0">
          <span className="relative inline-flex h-2 w-2 mt-1 bg-accent shrink-0">
            <span className="absolute inset-0 bg-accent" style={{ animation: 'blink 1.4s infinite' }} />
          </span>
          <span className="text-fg truncate"><span className="md:hidden">Available · 2026</span><span className="hidden md:inline">Available for work · 2026</span></span>
        </div>
      </div>

      {/* Main composition — asymmetric 12-col grid */}
      <div ref={contentRef} className="relative z-10 grid grid-cols-12 gap-0 px-6 md:px-10 pt-12 md:pt-16">
        {/* Left column — headline */}
        <div className="col-span-12 md:col-span-9">
          <h1
            ref={headlineRef}
            className="font-heavy uppercase leading-[0.82] tracking-tighter text-fg flex flex-col gap-0"
          >
            <span className="text-[16vw] md:text-[15vw] flex flex-wrap">{splitChars('JOSHUA')}</span>
            <span className="text-[13vw] md:text-[15vw] flex flex-wrap items-center">
              {splitChars('REBADOMIA')}
              <span className="inline-block w-[0.55em] h-[0.55em] bg-accent ml-[0.15em] shrink-0" aria-hidden="true" />
            </span>
          </h1>
        </div>

        {/* Right column — Bauhaus geometric composition */}
        <div className="hidden md:flex col-span-3 relative items-start justify-end pl-6">
          <div ref={compositionRef} className="relative w-full aspect-square max-w-[280px] border-2 border-border bg-bg">
            {/* Internal grid pattern */}
            <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.06]" />
            {/* Red circle */}
            <div className="absolute top-[18%] left-[18%] w-[42%] aspect-square rounded-full bg-accent" />
            {/* Black bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-fg" />
            {/* Diagonal line */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="1" className="text-fg" />
            </svg>
            {/* Corner label */}
            <div className="absolute top-2 right-2 text-[9px] uppercase tracking-[0.25em] font-bold text-fg">
              Fig. 01
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle row — divides via thick line */}
      <div className="relative z-10 mt-12 md:mt-16 grid grid-cols-12 gap-0 border-t-2 border-border px-6 md:px-10 py-8">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">A. Discipline</span>
          <p className="text-base md:text-lg font-bold uppercase leading-tight text-fg">
            AI Executive<br />& Full-Stack Developer
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 mt-6 md:mt-0 md:pl-8 md:border-l-2 md:border-border flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">B. Statement</span>
          <p className="text-sm md:text-base font-medium leading-snug text-fg-muted max-w-prose">
            Building intelligent systems that bridge AI and real-world business needs — from agentic
            automation pipelines to full-stack web &amp; mobile applications.
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 mt-6 md:mt-0 md:pl-8 md:border-l-2 md:border-border flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">C. Method</span>
          <ul className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-fg flex flex-col gap-1">
            <li>— Agentic Automation</li>
            <li>— Full-Stack Engineering</li>
            <li>— Hardware/IoT Integration</li>
            <li>— Workflow Engineering</li>
          </ul>
        </div>
      </div>

      {/* CTA row — strict rectangles, full-width on mobile */}
      <div className="relative z-10 grid grid-cols-12 gap-0 border-t-2 border-border">
        <a
          href="/projects"
          className="hover-trigger col-span-12 md:col-span-4 flex items-center justify-between gap-4 bg-fg text-bg hover:bg-accent transition-colors duration-200 px-6 md:px-10 py-7 group"
        >
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em]">View Projects</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
        <a
          href="mailto:rebadomiarobert@gmail.com"
          className="hover-trigger col-span-6 md:col-span-4 flex items-center justify-between gap-4 bg-bg text-fg border-t-2 md:border-t-0 md:border-l-2 border-border hover:bg-fg hover:text-bg transition-colors duration-200 px-6 md:px-10 py-7 group"
        >
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em]">Contact</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
        <a
          href="/Joshua_Rebadomia_Resume.pdf"
          download
          className="hover-trigger col-span-6 md:col-span-4 flex items-center justify-between gap-4 bg-bg text-fg border-t-2 md:border-t-0 md:border-l-2 border-border hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200 px-6 md:px-10 py-7 group"
        >
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em]">Resume</span>
          <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>

      {/* Bottom info ledger */}
      <div className="relative z-10 grid grid-cols-12 gap-0 border-t-2 border-border px-6 md:px-10 py-4">
        <div className="col-span-6 md:col-span-3 flex flex-col gap-0.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle min-w-0">
          <span>Currently</span>
          <span className="text-fg truncate"><span className="md:hidden">AI Executive</span><span className="hidden md:inline">AI Executive · Lifewood</span></span>
        </div>
        <div className="hidden md:flex col-span-3 flex-col gap-0.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
          <span>Selected works</span>
          <span className="text-fg">2023 — 2026</span>
        </div>
        <div className="hidden md:flex col-span-3 flex-col gap-0.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
          <span>Stack</span>
          <span className="text-fg">React · TypeScript · n8n · Claude</span>
        </div>
        <div className="col-span-6 md:col-span-3 flex flex-col items-end gap-0.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle min-w-0">
          <span className="inline-flex items-center gap-1.5">
            <ArrowDown className="w-3 h-3 text-accent" />
            Scroll
          </span>
          <span className="text-fg truncate"><span className="md:hidden">01 — Subject</span><span className="hidden md:inline">Section 01 — Subject</span></span>
        </div>
      </div>
    </section>
  );
};
