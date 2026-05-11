import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { TechIcon } from './TechIcon';

const CAPABILITIES = [
  { title: 'Agentics & AI Integration', desc: 'Building agentic automation pipelines with n8n, OpenClaw, and Claude AI — from prompt engineering and LLM integration to fully autonomous task workflows.', tags: ['n8n', 'OpenClaw', 'Claude AI', 'LLM'] },
  { title: 'Full Stack Development', desc: 'End-to-end architecture with React, Next.js, TypeScript, Supabase, and Spring Boot — designing scalable systems from database to deployment.', tags: ['React', 'Next.js', 'Supabase'] },
  { title: 'Web & Mobile Development', desc: 'Crafting performant web experiences with Vite and Tailwind, and cross-platform mobile apps with React Native (Expo) and push notifications.', tags: ['Vite', 'React Native', 'Expo'] },
  { title: 'Hardware–Software Integration', desc: 'Bridging physical and digital with ESP32/MFRC522 RFID systems, IoT sensor networks, and real-time data sync to cloud dashboards.', tags: ['ESP32', 'RFID', 'IoT'] },
];

export const CoreCapabilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.capability-row') as HTMLElement[];
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        }
      );

      const numEl = row.querySelector('[data-cap-num]') as HTMLElement | null;
      if (numEl) {
        const target = parseInt(numEl.dataset.capNum || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          onUpdate: () => {
            numEl.textContent = '0' + Math.round(obj.v);
          },
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full bg-bg border-t-2 border-border"
    >
      {/* Section header — numbered Swiss prefix */}
      <div className="grid grid-cols-12 border-b-2 border-border">
        <div className="col-span-12 md:col-span-4 px-6 md:px-10 py-8 md:py-12 border-b-2 md:border-b-0 md:border-r-2 border-border relative overflow-hidden">
          <div className="absolute inset-0 swiss-pattern-dots text-fg opacity-[0.06]" />
          <div className="relative">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
              Section 02 — System
            </span>
            <h2 className="font-heavy text-4xl sm:text-5xl md:text-7xl uppercase mt-4 leading-[0.85] tracking-tighter break-words">
              Core<br />Capabilities
            </h2>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 px-6 md:px-10 py-8 md:py-12 flex items-end">
          <p className="text-base md:text-lg font-medium text-fg-muted max-w-2xl leading-snug">
            Four overlapping disciplines. Each row defines a domain of practice — selected
            tools and methods used in production engagements.
          </p>
        </div>
      </div>

      {/* Capability rows */}
      <div className="flex flex-col">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={i}
            className="capability-row group relative grid grid-cols-12 gap-0 border-b-2 border-border bg-bg hover:bg-accent transition-colors duration-200"
          >
            {/* Index */}
            <div className="col-span-2 md:col-span-1 flex items-start px-4 md:px-6 py-8 md:py-12 border-r-2 border-border group-hover:border-white/30 transition-colors duration-200">
              <span
                data-cap-num={i + 1}
                className="font-mono-tight text-sm md:text-base font-bold text-fg group-hover:text-white transition-colors duration-200 tabular-nums tracking-tight"
              >
                00
              </span>
            </div>

            {/* Title */}
            <div className="col-span-10 md:col-span-5 px-6 md:px-10 py-8 md:py-12 border-r-2 border-border group-hover:border-white/30 transition-colors duration-200">
              <h3 className="font-heavy text-2xl md:text-4xl lg:text-5xl uppercase leading-[0.9] tracking-tighter text-fg group-hover:text-white transition-colors duration-200">
                {cap.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-6">
                {cap.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 border-2 border-border text-fg group-hover:border-white group-hover:text-white transition-colors duration-200"
                  >
                    <TechIcon name={t} className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-12 md:col-span-6 px-6 md:px-10 py-8 md:py-12 flex items-start justify-between gap-6">
              <p className="text-base md:text-lg font-medium text-fg-muted group-hover:text-white transition-colors duration-200 leading-snug max-w-xl">
                {cap.desc}
              </p>
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-fg group-hover:text-white shrink-0 transition-all duration-200 group-hover:rotate-45" strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
