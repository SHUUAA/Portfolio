import React, { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  date: string;
  repo: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "LifeScan",
    description: "Full-stack RFID attendance & workforce management system with ESP32-C6/MFRC522 hardware for shift detection, overtime, WiFi sync, a React 19 admin dashboard (DTR, analytics, accounting), and a React Native (Expo) mobile app.",
    tech: ["React 19", "TypeScript", "Supabase", "React Native", "ESP32", "Three.js"],
    date: "2026-04-15",
    repo: "SHUUAA/LifeScan",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "LiftApp",
    description: "Timed exam and annotation platform for historical record transcription across five exam types with automatic scoring, retake support, and an admin panel for managing content.",
    tech: ["React 19", "TypeScript", "Supabase", "Chart.js", "TailwindCSS", "Vercel"],
    date: "2026-04-12",
    repo: "SHUUAA/LiftApp",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "LifeChat (AI Interviewer V2)",
    description: "AI pre-screening platform with CV upload and real-time 10-minute voice interview using ElevenLabs AI agent 'Cebee.' Transcripts auto-processed via Google Sheets.",
    tech: ["Next.js 16", "TypeScript", "React 19", "ElevenLabs AI", "Google Sheets API"],
    date: "2026-02-20",
    repo: "PierceBorinaga/AI_Interviewer_V2_PH",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CampusEats",
    description: "Full-stack food delivery system with user registration, food ordering, order management, dasher applications, and secure payments via PayMongo API integration.",
    tech: ["React", "Java", "JavaScript", "MongoDB", "Spring Boot"],
    date: "2026-04-10",
    repo: "SHUUAA/campus_eats",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "TaskFlowLW",
    description: "Internal task flow management application for Lifewood with Kanban boards, assignment tracking, and PostgreSQL-backed persistence.",
    tech: ["TypeScript", "JavaScript", "PLpgSQL", "React"],
    date: "2026-02-27",
    repo: "Adrian6204/TaskFlowLW",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Digital Flipbook",
    description: "Interactive digital flipbook application with page-turn animations, PDF rendering, and a content management backend.",
    tech: ["TypeScript", "JavaScript", "PLpgSQL", "CSS"],
    date: "2026-02-04",
    repo: "Jaimes-Onix/digital-flipbook",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Data Cleaner",
    description: "Automated data cleaning utility for processing and normalizing datasets, ensuring accuracy for downstream AI workflows.",
    tech: ["TypeScript", "React", "Supabase"],
    date: "2025-11-07",
    repo: "SHUUAA/data-cleaner",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "TimeAdmin",
    description: "Time administration tool for managing work schedules, shift tracking, and attendance analytics.",
    tech: ["TypeScript", "React"],
    date: "2025-10-13",
    repo: "jvb2820/TimeAdmin",
    image: "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Lifewood Time Manager",
    description: "Workforce time management system with clock-in/out, overtime calculation, and reporting dashboards.",
    tech: ["TypeScript", "React"],
    date: "2025-10-10",
    repo: "jvb2820/Lifewood-Time-Manager",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "BYU Training Program",
    description: "Interactive web-based training program with module progression, quizzes, and completion tracking.",
    tech: ["JavaScript", "HTML", "CSS"],
    date: "2025-05-19",
    repo: "SHUUAA/BYU-Training-Program",
    image: "https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "DingTalk Manual",
    description: "Modern, responsive instruction manual for DingTalk with searchable content and step-by-step guides.",
    tech: ["JavaScript", "HTML", "CSS"],
    date: "2025-05-08",
    repo: "jvb2820/LW_DingTalk_Manual",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Synapse",
    description: "Cross-platform neural network utility built with C++ and Python for computational modeling and data processing.",
    tech: ["C++", "Python", "Shell"],
    date: "2025-05-05",
    repo: "SHUUAA/Synapse",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Converter",
    description: "Multi-language file and data format converter supporting batch transformations across Python, JavaScript, and C++.",
    tech: ["Python", "JavaScript", "C++"],
    date: "2025-03-05",
    repo: "SHUUAA/converter",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Lifewood Website",
    description: "Company website with application forms, admin panel, automated email notifications via EmailJS, and Firebase backend.",
    tech: ["React", "Firebase", "Ant Design", "EmailJS"],
    date: "2025-02-13",
    repo: "SHUUAA/Baba",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Vet Management System",
    description: "Backend API for a veterinary clinic management system handling appointments, patient records, and billing.",
    tech: ["C#", ".NET"],
    date: "2024-12-16",
    repo: "Dumosse/vet-management-system-backend",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Portfolio",
    description: "This portfolio — built with React 19, TypeScript, GSAP animations, Three.js, Lenis smooth scroll, and TailwindCSS.",
    tech: ["React", "TypeScript", "GSAP", "Three.js", "TailwindCSS"],
    date: "2024-12-15",
    repo: "SHUUAA/Portfolio",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Streamlit App",
    description: "Python/Streamlit file converter application for transforming between data formats with a drag-and-drop interface.",
    tech: ["Python", "Streamlit"],
    date: "2024-09-01",
    repo: "SHUUAA/basic-steamlit-app",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CampusEats Inventory",
    description: "Inventory management integration module for the CampusEats food delivery platform with stock tracking and alerts.",
    tech: ["TypeScript", "CSS", "HTML"],
    date: "2024-04-12",
    repo: "SHUUAA/Inventory-Integration-Campus-Eats",
    image: "https://images.unsplash.com/photo-1586528116311-ad86d5c5897?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CampusEats V1",
    description: "Initial version of the CampusEats food delivery system with core ordering and user management features.",
    tech: ["Java", "JavaScript", "Spring Boot"],
    date: "2024-04-02",
    repo: "shannandrei/campus_eats",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CampusEats Platform",
    description: "Frontend platform layer for the CampusEats ecosystem with restaurant browsing, cart, and order status.",
    tech: ["JavaScript", "HTML", "React"],
    date: "2024-04-01",
    repo: "shexiee/campus-eats",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Car Rental System",
    description: "Full-stack car rental booking system with vehicle catalog, availability calendar, and user management.",
    tech: ["Python", "HTML", "Flask"],
    date: "2023-12-24",
    repo: "SHUUAA/Car_Rental",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

type YearFilter = 'ALL' | string;

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [filter, setFilter] = useState<YearFilter>('ALL');

  const years = useMemo(() => {
    const all = Array.from(new Set(PROJECTS.map(p => new Date(p.date).getFullYear().toString())));
    return all.sort((a, b) => Number(b) - Number(a));
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'ALL') return PROJECTS;
    return PROJECTS.filter(p => new Date(p.date).getFullYear().toString() === filter);
  }, [filter]);

  const techCount = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach(p => p.tech.forEach(t => set.add(t)));
    return set.size;
  }, []);

  useGSAP(() => {
    const items = gsap.utils.toArray('.project-item') as HTMLElement[];
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          delay: (i % 8) * 0.05
        }
      );
    });

    // Heading clip-path mask reveal
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power4.out', delay: 0.2 }
      );
    }
  }, { scope: containerRef, dependencies: [filtered] });

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-bg pt-14 relative overflow-hidden"
    >
      {/* Header — Swiss section header */}
      <div className="grid grid-cols-12 border-t-2 border-border">
        <div className="col-span-12 md:col-span-5 px-6 md:px-10 py-10 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-border relative overflow-hidden">
          <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.05]" />
          <div className="relative">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
              Index — All Works
            </span>
            <h1 ref={headingRef} className="font-heavy text-6xl md:text-[8vw] uppercase text-fg leading-[0.85] tracking-tighter mt-4">
              Selected<br />Works
            </h1>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 grid grid-cols-2 md:grid-cols-4">
          <Stat index={0} label="Total" value={PROJECTS.length.toString().padStart(2, '0')} />
          <Stat index={1} label="Years" value={`${years[years.length - 1]}—${years[0].slice(2)}`} />
          <Stat index={2} label="Stacks" value={techCount.toString()} />
          <Stat index={3} label="Status" value="Active" accent />
        </div>
      </div>

      {/* Year Filter — strict ledger row */}
      <div className="grid grid-cols-12 border-t-2 border-border">
        <div className="col-span-12 md:col-span-3 px-6 md:px-10 py-5 border-b-2 md:border-b-0 md:border-r-2 border-border flex items-center text-[11px] uppercase tracking-[0.3em] font-bold text-fg">
          Filter / Year
        </div>
        <div className="col-span-12 md:col-span-9 px-6 md:px-10 py-5 flex flex-wrap items-center gap-2">
          <FilterPill active={filter === 'ALL'} onClick={() => setFilter('ALL')}>
            All ({PROJECTS.length})
          </FilterPill>
          {years.map((y) => (
            <FilterPill key={y} active={filter === y} onClick={() => setFilter(y)}>
              {y}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Projects List — typographic ledger */}
      <div className="flex flex-col border-t-2 border-border">
        {/* Header row */}
        <div className="hidden md:grid grid-cols-12 px-6 md:px-10 py-3 bg-bg-elevated border-b-2 border-border text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
          <span className="col-span-1">Ref.</span>
          <span className="col-span-5">Title</span>
          <span className="col-span-4">Stack</span>
          <span className="col-span-2 text-right">Year</span>
        </div>

        {filtered.map((project, idx) => (
          <div
            key={`${project.repo}-${idx}`}
            className="project-item group relative grid grid-cols-12 px-6 md:px-10 py-6 md:py-8 border-b-2 border-border bg-bg hover:bg-accent transition-colors duration-200 items-center"
          >
            <span className="col-span-2 md:col-span-1 font-mono-tight text-xs md:text-sm font-bold text-fg group-hover:text-white tabular-nums uppercase tracking-tight transition-colors duration-200">
              P/{(idx + 1).toString().padStart(2, '0')}
            </span>

            <h3 className="col-span-10 md:col-span-5 font-heavy text-xl md:text-2xl lg:text-4xl uppercase tracking-tighter text-fg group-hover:text-white flex items-center gap-3 transition-colors duration-200">
              <span className="truncate">{project.title}</span>
              <ArrowUpRight
                className="w-5 h-5 md:w-6 md:h-6 text-fg group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                strokeWidth={2.5}
              />
            </h3>

            <div className="hidden md:flex col-span-4 flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border-2 border-border text-fg group-hover:border-white group-hover:text-white transition-colors duration-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <span className="hidden md:block col-span-2 text-right font-heavy text-xl md:text-2xl text-fg group-hover:text-white tabular-nums tracking-tighter transition-colors duration-200">
              {new Date(project.date).getFullYear()}
            </span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 text-center text-fg-subtle uppercase tracking-[0.3em] text-xs font-bold border-b-2 border-border">
          No projects in {filter}
        </div>
      )}

      {/* Footer note */}
      <div className="grid grid-cols-12 px-6 md:px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
        <span className="col-span-12 md:col-span-6">
          End of index · {filtered.length} item{filtered.length === 1 ? '' : 's'}
        </span>
        <a
          href="https://github.com/SHUUAA"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-trigger col-span-12 md:col-span-6 md:text-right inline-flex md:justify-end items-center gap-2 text-fg hover:text-accent transition-colors duration-200"
        >
          View on GitHub
          <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
};

const Stat: React.FC<{ index: number; label: string; value: string; accent?: boolean }> = ({ index, label, value, accent }) => {
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = valueRef.current;
    if (!el) return;

    // Only animate purely numeric values; render text values as-is
    const numeric = parseInt(value, 10);
    if (Number.isNaN(numeric) || /[^\d]/.test(value)) {
      el.textContent = value;
      return;
    }

    const obj = { v: 0 };
    const pad = value.length;

    gsap.fromTo(
      obj,
      { v: 0 },
      {
        v: numeric,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toString().padStart(pad, '0');
        },
      }
    );
  }, []);

  const borderClass = [
    'border-border',
    index < 2 ? 'border-b-2 md:border-b-0' : '',
    index % 2 === 0 ? 'border-r-2' : '',
    index === 3 ? '' : 'md:border-r-2',
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col justify-between gap-3 px-4 sm:px-6 md:px-8 py-6 md:py-10 ${borderClass} min-h-[120px] md:min-h-[180px]`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-fg-subtle font-bold">
        / {label}
      </span>
      <span
        ref={valueRef}
        className={`font-heavy text-2xl sm:text-3xl md:text-5xl tabular-nums tracking-tighter leading-none break-words ${accent ? 'text-accent' : 'text-fg'}`}
      >
        {value}
      </span>
    </div>
  );
};

const FilterPill: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`hover-trigger px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border-2 transition-colors duration-200 ${
      active
        ? 'bg-accent border-accent text-white'
        : 'bg-bg border-border text-fg hover:bg-fg hover:text-bg'
    }`}
  >
    {children}
  </button>
);

export default Projects;
