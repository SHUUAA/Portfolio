import React from 'react';
import GlassSurface from './GlassSurface';

export const PROJECTS = [
  {
    title: "NEURAL INTERFACE",
    category: "AI / RESEARCH",
    description: "A brain-computer interface concept visualizing neural activity in real-time.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "FLUID DYNAMICS",
    category: "WEBGL / PHYSICS",
    description: "Highly optimized Navier-Stokes simulations for interactive web environments.",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "QUANTUM VAULT",
    category: "CYBERSECURITY",
    description: "Encrypted data storage solution utilizing post-quantum cryptographic algorithms.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
  }
];

const SKILLS = [
  "React / Next.js", "TypeScript", "WebGL / Three.js", 
  "Node.js", "Rust", "Python", "Docker", "AWS"
];

export const Sections: React.FC = () => {
  return (
    <div className="space-y-24 md:space-y-32 pb-32">
      {/* Projects Section */}
      <section id="projects" className="scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">Selected Works</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              CRAFTING PIXELS <br />
              INTO <span className="text-cyan-400">EMOTION</span>
            </h3>
          </div>
          <div className="hidden md:block w-24 lg:w-32 h-[1px] bg-white/10 mb-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <GlassSurface 
              key={i} 
              width="100%" 
              height="auto"
              borderRadius={32}
              backgroundOpacity={0.05}
              brightness={30}
              blur={15}
              distortionScale={-60}
              className="group cursor-pointer hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="p-2 w-full">
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 block">
                      {project.category}
                    </span>
                    <h4 className="text-lg md:text-xl font-black text-white tracking-tight">{project.title}</h4>
                  </div>
                </div>
                <p className="px-4 pb-4 text-white/40 text-[12px] md:text-[13px] font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>
            </GlassSurface>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-32">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={40}
          backgroundOpacity={0.02}
          blur={10}
          className="p-8 md:p-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full">
            <div>
              <h2 className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6">Capabilities</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-8 leading-tight">
                TECH STACK <br />
                FOR THE <span className="text-cyan-400">FUTURE</span>
              </h3>
              <p className="text-white/40 text-base md:text-lg font-medium max-w-md">
                Combining engineering excellence with artistic vision to build 
                the next generation of web applications.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {SKILLS.map((skill, i) => (
                <div key={i} className="px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors duration-300">
                  <span className="text-white/70 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassSurface>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-32 text-center py-10 md:py-20">
        <h2 className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-8">Get In Touch</h2>
        <h3 className="text-3xl sm:text-4xl md:text-8xl font-black text-white tracking-tighter mb-12 leading-tight">
          READY TO <br />
          <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>START A PROJECT?</span>
        </h3>
        
        <div className="px-4">
          <GlassSurface
            width="auto"
            height="auto"
            borderRadius={50}
            className="inline-block p-1"
          >
            <button className="px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-black font-black uppercase tracking-widest text-base md:text-lg hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(34,211,238,0.3)]">
              hi@portfolio.com
            </button>
          </GlassSurface>
        </div>
      </section>
    </div>
  );
};
