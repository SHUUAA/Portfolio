import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { CoreCapabilities } from './CoreCapabilities';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const PROJECTS = [
  {
    title: "Lifewood Website",
    category: "WEB DEVELOPMENT",
    description: "Developed a comprehensive company website showcasing Lifewood's services and projects. Includes an application form, admin panel for managing applications, and automated messaging for application updates.",
    tech: ["React Vite", "CSS", "Ant Design", "Firebase", "EmailJS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "CampusEats",
    category: "CAPSTONE PROJECT",
    description: "Full-stack food delivery system with user registration, food ordering, order management, dasher applications, and secure payments with integrated PayMongo API.",
    tech: ["React", "JavaScript", "MongoDB", "Spring Boot", "PayMongo"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "EduSculp",
    category: "LEARNING PLATFORM",
    description: "Online learning platform with course offerings. Designed and implemented the contact page and built the finish course feature with feedback and rating functionality.",
    tech: ["React", "CSS", "Spring Boot"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
  }
];

const SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "Java", "Python", 
  "ReactJS", "NodeJS", "Spring Boot", "MySQL", "MongoDB", 
  "TailwindCSS", "GSAP", "Git", "Figma"
];

export const EXPERIENCE = [
  {
    company: "Lifewood Data Technology Ltd.",
    role: "AI Executive & Project Coordinator",
    period: "Apr 2025 - Present",
    duration: "1 yr 1 mo",
    description: "Responsible for coordinating AI-driven projects and supporting the integration of advanced tools across teams. Manage timelines, ensure quality delivery, and facilitate collaboration between technical and operational units. Lead training programs, oversee data workflows, and contribute to the successful execution of global AI initiatives.",
    location: "Cebu, Philippines • On-site",
    color: "black"
  },
  {
    company: "Lifewood Data Technology Ltd.",
    role: "Intern",
    period: "Jan 2025 - Mar 2025",
    duration: "3 mos",
    description: "Managed data processing tasks alongside web development projects and collection of text and object data while maintaining websites. Focused on website maintenance and dataset accuracy management, covering entry-level data management and web development support.",
    location: "Cebu, Philippines • On-site",
    color: "black"
  }
];

// Duplicate skills array to make the infinite marquee seamless
const MARQUEE_SKILLS = [...SKILLS, ...SKILLS, ...SKILLS];

export const Sections: React.FC = () => {
  const horizontalPinRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Horizontal Scroll for Experience Section
    const horizontalContainer = horizontalContainerRef.current;
    if (horizontalContainer) {
      const getScrollAmount = () => -(horizontalContainer.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(horizontalContainer, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalPinRef.current,
          start: "top top",
          end: () => `+=${horizontalContainer.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Cleanup
      return () => tween.kill();
    }
  });

  useGSAP(() => {
    // 2. Project Card Clip-Path Reveals
    const projectCards = gsap.utils.toArray('.project-card') as HTMLElement[];
    projectCards.forEach((card) => {
      const img = card.querySelector('.project-img');
      if (img) {
        gsap.fromTo(img, 
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.1 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );
      }
    });

    // 3. Simple fade ups for text
    const fadeUps = gsap.utils.toArray('.fade-up') as HTMLElement[];
    fadeUps.forEach((elem) => {
      gsap.fromTo(elem,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: elem, start: "top 85%" }
        }
      );
    });
  });

  return (
    <div className="w-full bg-[#F3F4F6] relative z-10">
      
      <CoreCapabilities />

      {/* 1. Projects Section (Light Background) */}
      <section id="projects" className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-heavy text-5xl md:text-7xl uppercase mb-20 fade-up">Selected Works</h2>
        
        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`project-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                
                {/* Image Container with Clip Path Reveal */}
                <div className="w-full md:w-[60%] aspect-[4/3] overflow-hidden bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                
                {/* Text Description */}
                <div className="w-full md:w-[40%] flex flex-col fade-up">
                  <span className="text-xs uppercase tracking-widest font-bold mb-4">
                    0{idx + 1} / {project.category}
                  </span>
                  <h3 className="font-heavy text-4xl mb-6 uppercase leading-none">{project.title}</h3>
                  <p className="text-gray-600 mb-8 font-medium">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-black rounded-full font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 group self-start hover-trigger">
                    <span className="font-bold uppercase tracking-wider text-sm border-b-2 border-transparent group-hover:border-black transition-all">View Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Skills Marquee Section */}
      <section className="py-20 overflow-hidden border-y-2 border-black bg-[#F3F4F6]">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] will-change-transform">
          {MARQUEE_SKILLS.map((skill, idx) => (
            <span key={idx} className="text-6xl md:text-8xl font-heavy uppercase mx-8 text-outline">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Horizontal Experience Section (Dark Background) */}
      <div ref={horizontalPinRef} className="h-screen w-full bg-black text-white overflow-hidden relative">
        <div ref={horizontalContainerRef} className="flex h-full" style={{ width: `${(EXPERIENCE.length + 2) * 100}vw` }}>
          
          {/* Header Slide */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24 shrink-0 border-r border-white/20 relative overflow-hidden">
            <h2 className="font-heavy text-6xl md:text-9xl uppercase z-10 text-outline-white">Experience</h2>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 text-[30vw] font-heavy pointer-events-none">
              WORKS
            </div>
            <p className="mt-8 max-w-md text-gray-400 font-medium z-10">
              A journey of coordinating AI initiatives, developing digital experiences, and managing global data workflows.
            </p>
          </div>

          {/* Experience Slides */}
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="w-screen h-full flex items-center justify-center shrink-0 px-12 relative border-r border-white/20">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-heavy opacity-[0.03] pointer-events-none z-0">
                 0{idx + 1}
               </div>
               <div className="z-10 max-w-2xl w-full">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                   <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 block">
                     {exp.company} / {exp.period}
                   </span>
                   <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border border-white/20 rounded-full text-gray-400 w-fit">
                     {exp.duration}
                   </span>
                 </div>
                 <h3 className="text-4xl md:text-6xl font-heavy uppercase mb-6 leading-tight">
                   {exp.role.split('&').map((part, i) => (
                     <React.Fragment key={i}>
                       {part} {i === 0 && exp.role.includes('&') && <span className="text-outline-white text-3xl md:text-5xl">&</span>}
                     </React.Fragment>
                   ))}
                 </h3>
                 <p className="text-gray-400 leading-relaxed font-medium mb-6 text-lg">
                   {exp.description}
                 </p>
                 <div className="text-xs font-bold tracking-widest uppercase text-white/40">
                   {exp.location}
                 </div>
               </div>
            </div>
          ))}

          {/* CTA Slide */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24 shrink-0 bg-[#F3F4F6] text-black">
             <h2 className="font-heavy text-5xl md:text-7xl uppercase mb-8">What's Next?</h2>
             <p className="font-medium max-w-lg mb-8 text-xl">I am currently leading AI initiatives and coordinating global projects, always open to discussing new innovations and collaborations.</p>
             
             <a href="mailto:rebadomiarobert@gmail.com" className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors w-max group hover-trigger">
               Start a project
               <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </div>

        </div>
      </div>

      {/* 4. Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heavy text-2xl uppercase tracking-widest">Joshua Rebadomia</div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:rebadomiarobert@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
