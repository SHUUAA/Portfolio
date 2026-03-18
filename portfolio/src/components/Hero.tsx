import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="relative z-10 max-w-4xl w-full">
        <h2 className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 animate-fade-in">
          Creative Developer & Designer
        </h2>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          BUILDING DIGITAL <br />
          <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            EXPERIENCES
          </span>
        </h1>
        
        <p className="max-w-xl mx-auto text-white/50 text-base md:text-lg font-medium leading-relaxed mb-12">
          Specializing in high-performance web applications with a focus on 
          premium aesthetics and interactive motion design.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-white/80 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1">
            View Projects
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Resume
          </button>
        </div>
      </div>
    </section>
  );
};
