import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CAPABILITIES = [
  { title: "Agentics & AI Integration", desc: "Implementing intelligent systems, autonomous agents, and LLM integrations to automate and enhance digital workflows." },
  { title: "Full Stack Development", desc: "End-to-end architecture designing scalable backend systems and responsive frontend applications." },
  { title: "Web Development", desc: "Crafting extremely performant, accessible, and breathtaking web experiences using modern frameworks." },
  { title: "App Development", desc: "Building intuitive mobile-first applications that deliver flawless cross-platform performance." },
];

export const CoreCapabilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.capability-row') as HTMLElement[];
    rows.forEach((row) => {
      gsap.fromTo(row, 
        { opacity: 0, x: -60, filter: "blur(10px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)",
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="capabilities" className="py-24 md:py-40 px-4 md:px-12 max-w-7xl mx-auto relative z-10 w-full bg-[#F3F4F6]">
      <div className="flex items-center gap-4 mb-20">
         <span className="w-12 h-[2px] bg-black block" />
         <h2 className="text-sm font-bold uppercase tracking-[0.3em] overflow-hidden">
            <span className="fade-up inline-block">Core Capabilities</span>
         </h2>
      </div>
      
      <div className="flex flex-col gap-12">
        {CAPABILITIES.map((cap, i) => (
          <div key={i} className="capability-row flex flex-col md:flex-row items-baseline gap-4 md:gap-12 border-b border-black/10 pb-12">
            <div className="text-gray-300 font-heavy text-4xl md:text-5xl w-[80px] shrink-0">0{i + 1}</div>
            <div className="w-full md:w-1/2">
               <h3 className="font-heavy text-3xl md:text-5xl uppercase leading-[0.9]">{cap.title}</h3>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
               <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed max-w-lg">{cap.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
