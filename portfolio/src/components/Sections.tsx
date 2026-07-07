import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, GraduationCap, Calendar, MapPin, Mail, Phone, Award } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { CoreCapabilities } from './CoreCapabilities';
import { TechIcon } from './TechIcon';
import { CertificateModal, type CertificateData } from './CertificateModal';

gsap.registerPlugin(ScrollTrigger);

export const PROJECTS = [
  {
    title: 'LifeScan',
    category: 'RFID & IOT SYSTEM',
    year: '2025',
    description:
      'Full-stack RFID attendance & workforce management system with ESP32-C6/MFRC522 hardware for shift detection, overtime, and WiFi sync. Includes a React admin dashboard with DTR, analytics, and accounting modules, plus a React Native (Expo) mobile app for leave requests and push notifications.',
    tech: ['React', 'TypeScript', 'Supabase', 'React Native', 'ESP32', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
    github: 'https://github.com/SHUUAA',
    live: '#',
  },
  {
    title: 'LiftApp',
    category: 'EXAM & ANNOTATION PLATFORM',
    year: '2025',
    description:
      'Timed exam and annotation platform for historical record transcription across five exam types. Users annotate scanned documents into structured tables with automatic scoring, retake support, and an admin panel for managing images, answer keys, and progress.',
    tech: ['React', 'TypeScript', 'Supabase', 'Chart.js', 'TailwindCSS', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    github: 'https://github.com/SHUUAA',
    live: '#',
  },
  {
    title: 'LifeChat',
    category: 'AI-POWERED PLATFORM',
    year: '2025',
    description:
      "AI pre-screening platform where candidates submit applications with CV upload and engage in a real-time 10-minute voice interview with ElevenLabs AI agent 'Cebee.' Transcripts are auto-processed and logged via Google Sheets integration.",
    tech: ['Next.js 16', 'TypeScript', 'React', 'ElevenLabs AI', 'Google Sheets API'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    github: 'https://github.com/PierceBorinaga/AI_Interviewer_V2_PH',
    live: '#',
  },
];

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Java',
  'Node.js', 'Spring Boot', 'React Native', 'Vite',
  'Supabase', 'Firebase', 'MongoDB', 'MySQL',
  'n8n', 'OpenClaw', 'Claude AI', 'LLM Integration', 'Prompt Engineering',
  'RAG', 'Chatbot Development',
  'TailwindCSS', 'Three.js', 'GSAP', 'Git', 'Figma', 'Power BI', 'Postman',
];

export const EXPERIENCE = [
  {
    company: 'Lifewood Data Technology Ltd.',
    role: 'AI Executive & Project Coordinator',
    period: 'Apr 2025 — Present',
    duration: '1 yr+',
    description:
      'Coordinated AI-driven projects and built agentic automation pipelines using n8n, OpenClaw, and Claude AI. Led training programs, oversaw data workflows for global AI initiatives, and automated repetitive workflows through prompt engineering and LLM integration.',
    location: 'Cebu, Philippines · On-site',
  },
  {
    company: 'Lifewood Data Technology Ltd.',
    role: 'IT Intern',
    period: 'Jan 2025 — Mar 2025',
    duration: '3 mos',
    description:
      'Built responsive apps using React Vite, Ant Design, Firebase, and EmailJS, including a Python/Streamlit file converter. Maintained websites, ensured dataset accuracy, and supported data management and IT operations.',
    location: 'Cebu, Philippines · On-site',
  },
];

export const CERTIFICATES = [
  // AI Community certificates (with local images)
  {
    title: 'Ship Mobile AI · Skip the Cloud',
    issuer: 'AI Cebu Community × FrontierAI',
    date: 'May 10, 2026',
    location: 'Online',
    image: '/Certificate%20-%20Joshua%20Robert%20Rebadomia_page-0001.jpg',
  },
  {
    title: 'Agents & AI at the Frontier!',
    issuer: 'AI Cebu Community × FrontierAI',
    date: 'Mar 28, 2026',
    location: 'Zero-Ten Park, Mandaue',
    image: '/Certificate%20-%20Joshua%20Robert%20Rebadomia%20(1)_page-0001.jpg',
  },
  // Anthropic Skilljar certificates
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/zntifbx2gqos',
  },
  {
    title: 'Claude Code 101',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/ion7fmvbhwzs',
  },
  {
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/up635d4rvuo9',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/xuj4zwn5jtue',
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/ktp3jah6jq2z',
  },
  {
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/ftoiptrqg893',
  },
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/ovqiq9oifkqd',
  },
  {
    title: 'AI Fluency for Educators',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/esru58apzchj',
  },
  {
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/jnqp2xjp3fnf',
  },
  {
    title: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/335yw6rjbk67',
  },
  {
    title: 'Claude with Amazon Bedrock',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/hn9ohk3twetn',
  },
  {
    title: 'Claude with Google Cloud Vertex AI',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/h4igf8yn8w9m',
  },
  {
    title: 'Teaching AI Fluency',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/ms2r4edrwujf',
  },
  {
    title: 'AI Fluency for Nonprofits',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/7crf99a2iv95',
  },
  {
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/n8yx924r566m',
  },
  {
    title: 'Introduction to Subagents',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/mum7ngn58cyn',
  },
  {
    title: 'AI Capabilities and Limitations',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/rf7ka66c7b23',
  },
  {
    title: 'AI Fluency for Small Businesses',
    issuer: 'Anthropic',
    date: '2026',
    location: 'Online',
    verifyUrl: 'https://verify.skilljar.com/c/vf38h4oh7k9j',
  },
];

const STATS = [
  { num: '22+', label: 'Projects Built' },
  { num: '4+',  label: 'Years Coding' },
  { num: '25+', label: 'Technologies' },
  { num: '03',  label: 'AI Pipelines' },
];

const MARQUEE_SKILLS = [...SKILLS, ...SKILLS, ...SKILLS];
const MARQUEE_SKILLS_REV = [...SKILLS, ...SKILLS];

export const Sections: React.FC = () => {
  const horizontalPinRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRevRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

  useGSAP(() => {
    const horizontalContainer = horizontalContainerRef.current;
    if (horizontalContainer) {
      const getScrollAmount = () => -(horizontalContainer.scrollWidth - window.innerWidth);

      const tween = gsap.to(horizontalContainer, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalPinRef.current,
          start: 'top top',
          end: () => `+=${horizontalContainer.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    }
  });

  useGSAP(() => {
    // Project image clip-path reveal
    const projectCards = gsap.utils.toArray('.project-card') as HTMLElement[];
    projectCards.forEach((card) => {
      const img = card.querySelector('.project-img');
      if (img) {
        gsap.fromTo(
          img,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', scale: 1.1 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        );
      }
    });

    // Fade-ups
    const fadeUps = gsap.utils.toArray('.fade-up') as HTMLElement[];
    fadeUps.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: elem, start: 'top 88%' },
        }
      );
    });

    // Mask wipe for headlines
    const masks = gsap.utils.toArray('[data-reveal="mask"]') as HTMLElement[];
    masks.forEach((elem) => {
      gsap.fromTo(
        elem,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: elem, start: 'top 88%' },
        }
      );
    });

    // Marquee velocity coupling
    if (marqueeRef.current && marqueeRevRef.current) {
      const tween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      gsap.set(marqueeRevRef.current, { xPercent: -50 });
      const tweenRev = gsap.to(marqueeRevRef.current, {
        xPercent: 0,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      let current = 1;
      let currentRev = 1;
      const tickerCb = () => {
        const lenis = (window as any).lenis;
        const v = lenis ? Math.abs(lenis.velocity || 0) : 0;
        const target = 1 + Math.min(v * 0.04, 6);
        current += (target - current) * 0.1;
        currentRev += (target - currentRev) * 0.1;
        tween.timeScale(current);
        tweenRev.timeScale(currentRev);
      };
      gsap.ticker.add(tickerCb);

      return () => {
        tween.kill();
        tweenRev.kill();
        gsap.ticker.remove(tickerCb);
      };
    }
  });

  return (
    <div className="w-full bg-bg relative z-10">

      {/* 01 — Subject (About / Stats / Education) */}
      <section id="about" className="relative border-t-2 border-border">
        {/* Section label header */}
        <div className="grid grid-cols-12 border-b-2 border-border">
          {/* Title column — large decorative number + title */}
          <div className="col-span-12 md:col-span-4 px-6 md:px-10 py-8 md:py-12 border-b-2 md:border-b-0 md:border-r-2 border-border relative overflow-hidden">
            <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.05]" />
            {/* Large decorative number */}
            <div className="absolute -right-4 -bottom-6 font-heavy text-[180px] md:text-[220px] leading-none tracking-tighter text-fg opacity-[0.04] select-none pointer-events-none" aria-hidden="true">
              01
            </div>
            <div className="relative">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                Section 01 — Subject
              </span>
              <h2 data-reveal="mask" className="font-heavy text-5xl md:text-7xl uppercase mt-4 leading-[0.85] tracking-tighter">
                About<br />Me
              </h2>
              {/* Mini location tag */}
              <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
                <span className="w-1.5 h-1.5 bg-accent" />
                Cebu, Philippines
              </div>
            </div>
          </div>

          {/* Bio column — structured with labeled sub-sections */}
          <div className="col-span-12 md:col-span-5 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col">
            {/* Highlight quote strip */}
            <div className="px-6 md:px-10 py-5 border-b-2 border-border bg-accent text-white fade-up">
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.1em] leading-snug">
                "Bridging AI technology with real-world business impact."
              </p>
            </div>

            {/* Bio sections */}
            <div className="px-6 md:px-10 py-6 md:py-8 flex flex-col gap-6 flex-1">
              <div className="fade-up">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2 block">A. Background</span>
                <p className="text-sm md:text-base font-medium text-fg-muted leading-snug">
                  AI Executive &amp; Full-Stack Developer. I bridge the gap
                  between cutting-edge AI technology and real-world business needs — from agentic
                  automation pipelines with n8n, OpenClaw, and Claude AI, to production-grade
                  web &amp; mobile applications.
                </p>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="fade-up">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2 block">B. Expertise</span>
                <p className="text-sm md:text-base font-medium text-fg-muted leading-snug">
                  LLM integration, prompt engineering, chatbot &amp; RAG systems,
                  hardware-software systems (RFID/IoT), and modern React ecosystems —
                  thriving at the intersection of technology and human impact.
                </p>
              </div>

              <div className="w-full h-px bg-border" />

              {/* Focus areas */}
              <div className="fade-up">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-3 block">C. Focus Areas</span>
                <div className="flex flex-wrap gap-2">
                  {['Agentic AI', 'Chatbot / RAG', 'Full-Stack Apps', 'IoT / Hardware', 'Workflow Automation', 'LLM Pipelines', 'Mobile Dev'].map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 border-2 border-border text-fg hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200 cursor-default"
                    >
                      <span className="w-1 h-1 bg-accent shrink-0" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Polaris Access Card */}
          <div className="col-span-12 md:col-span-3 relative overflow-hidden flex flex-col items-center justify-center gap-3 px-4 md:px-6 py-8 md:py-12 fade-up">
            <div className="absolute inset-0 swiss-pattern-diagonal text-fg opacity-[0.03]" />
            <span className="relative text-[10px] uppercase tracking-[0.3em] font-bold text-accent">Access Card</span>
            <div className="relative border-2 border-border bg-bg-elevated overflow-hidden transition-transform duration-300 hover:rotate-1 hover:scale-[1.02]">
              <iframe
                src="https://polarisdev-gamma.vercel.app/access-card?name=Joshua+Robert+C.+Rebadomia&role=CO-FOUNDER&type=Backend+Developer+%7C+AI+Engineer"
                width="220"
                height="340"
                style={{ border: 'none', background: 'transparent', overflow: 'hidden' }}
                title="Polaris Access Card - Joshua Robert C. Rebadomia"
                loading="lazy"
              />
            </div>
            <span className="relative text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle mt-1">Polaris · Co-Founder</span>
          </div>
        </div>

        {/* Stats — 4-up grid with hover red flip + rotating plus */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-border">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`group relative p-6 md:p-10 bg-bg hover:bg-accent transition-colors duration-200 ${
                i < 2 ? 'border-b-2 md:border-b-0' : ''
              } ${i % 2 === 0 ? 'border-r-2' : ''} md:border-r-2 border-border ${i === 3 ? 'md:border-r-0' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle group-hover:text-white transition-colors duration-200">
                  0{i + 1}
                </span>
                <span className="text-[24px] leading-none font-thin text-fg group-hover:text-white group-hover:rotate-90 transition-all duration-200">
                  +
                </span>
              </div>
              <div className="mt-8 md:mt-12">
                <div className="font-heavy text-5xl md:text-7xl text-fg group-hover:text-white tracking-tighter leading-none transition-colors duration-200 group-hover:scale-[1.04] origin-left">
                  {stat.num}
                </div>
                <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-fg-muted group-hover:text-white transition-colors duration-200">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education — single row */}
        <div className="grid grid-cols-12 border-b-2 border-border">
          <div className="col-span-12 md:col-span-3 px-6 md:px-10 py-6 border-b-2 md:border-b-0 md:border-r-2 border-border flex items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
              Curriculum / Education
            </span>
          </div>
          <div className="col-span-12 md:col-span-9 px-6 md:px-10 py-8 group hover:bg-accent transition-colors duration-200 fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 border-2 border-border bg-bg group-hover:bg-bg group-hover:border-bg flex items-center justify-center shrink-0 transition-colors duration-200">
                  <GraduationCap className="w-5 h-5 text-fg" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-heavy text-xl md:text-3xl uppercase leading-tight tracking-tight text-fg group-hover:text-white transition-colors duration-200">
                    Cebu Institute of Technology — University
                  </h3>
                  <p className="text-sm md:text-base font-bold text-fg-muted group-hover:text-white mt-1 transition-colors duration-200">
                    B.S. Information Technology
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 text-fg group-hover:text-white transition-colors duration-200">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]">
                  <Calendar className="w-3 h-3" strokeWidth={2.5} />
                  Jan 2021 — May 2025
                </span>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]">
                  <MapPin className="w-3 h-3" strokeWidth={2.5} />
                  Cebu City, Philippines
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications — full marquee */}
        <div id="certifications" className="grid grid-cols-12 border-b-2 border-border">
          <div className="col-span-12 md:col-span-3 px-6 md:px-10 py-6 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col justify-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
              Credentials / Certifications
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
              {CERTIFICATES.length} Verified
            </span>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-[#22c55e] bg-[#22c55e]">
                <Award className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
              <div className="w-6 h-6 flex items-center justify-center border-2 border-[#D4A27F] bg-[#D4A27F]">
                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0H10.172L16.742 20.48H13.14L11.06 15.14H5.532l-2.078 5.34H0L6.57 3.52zm4.132 8.69L8.283 6.27l-2.418 5.94h4.84z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 overflow-hidden py-6 flex flex-col justify-center gap-3">
            {/* Row 1 — scrolls left (AI Community certs repeated 5x for frequency) */}
            <div className="cert-marquee-row flex whitespace-nowrap">
              {(() => {
                const community = CERTIFICATES.filter(c => c.image);
                const anthropic = CERTIFICATES.filter(c => !c.image);
                // Repeat community certs 5x so they appear frequently
                const boosted = [...Array(5)].flatMap(() => community);
                const combined = [...boosted, ...anthropic];
                return [...combined, ...combined].map((cert, i) => (
                  <button
                    key={`r1-${i}`}
                    onClick={() => setSelectedCert(cert as CertificateData)}
                    className={`hover-trigger group inline-flex items-center gap-2 px-4 py-2.5 mx-1.5 shrink-0 transition-all duration-200 cursor-pointer border-2 bg-bg ${
                      cert.image
                        ? 'border-[#22c55e] hover:bg-[#22c55e]'
                        : 'border-[#D4A27F] hover:bg-[#D4A27F]'
                    }`}
                  >
                    {cert.image ? (
                      <Award className="w-3.5 h-3.5 shrink-0 text-[#22c55e] group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-[#D4A27F] group-hover:text-white transition-colors duration-200" aria-hidden="true">
                        <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0H10.172L16.742 20.48H13.14L11.06 15.14H5.532l-2.078 5.34H0L6.57 3.52zm4.132 8.69L8.283 6.27l-2.418 5.94h4.84z" fill="currentColor"/>
                      </svg>
                    )}
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-fg group-hover:text-white transition-colors duration-200">
                      {cert.title}
                    </span>
                  </button>
                ));
              })()}
            </div>

            {/* Row 2 — scrolls right (reverse, AI Community certs repeated 5x) */}
            <div className="cert-marquee-row-reverse flex whitespace-nowrap">
              {(() => {
                const community = CERTIFICATES.filter(c => c.image);
                const anthropic = CERTIFICATES.filter(c => !c.image);
                const boosted = [...Array(5)].flatMap(() => community);
                const combined = [...anthropic.reverse(), ...boosted];
                return [...combined, ...combined].map((cert, i) => (
                  <button
                    key={`r2-${i}`}
                    onClick={() => setSelectedCert(cert as CertificateData)}
                    className={`hover-trigger group inline-flex items-center gap-2 px-4 py-2.5 mx-1.5 shrink-0 transition-all duration-200 cursor-pointer border-2 bg-bg ${
                      cert.image
                        ? 'border-[#22c55e] hover:bg-[#22c55e]'
                        : 'border-[#D4A27F] hover:bg-[#D4A27F]'
                    }`}
                  >
                    {cert.image ? (
                      <Award className="w-3.5 h-3.5 shrink-0 text-[#22c55e] group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-[#D4A27F] group-hover:text-white transition-colors duration-200" aria-hidden="true">
                        <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0H10.172L16.742 20.48H13.14L11.06 15.14H5.532l-2.078 5.34H0L6.57 3.52zm4.132 8.69L8.283 6.27l-2.418 5.94h4.84z" fill="currentColor"/>
                      </svg>
                    )}
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-fg group-hover:text-white transition-colors duration-200">
                      {cert.title}
                    </span>
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Method (Core Capabilities) */}
      <CoreCapabilities />

      {/* 03 — Works (Featured Projects) */}
      <section id="projects" className="relative">
        <div className="grid grid-cols-12 border-b-2 border-border">
          <div className="col-span-12 md:col-span-4 px-6 md:px-10 py-8 md:py-12 border-b-2 md:border-b-0 md:border-r-2 border-border relative overflow-hidden">
            <div className="absolute inset-0 swiss-pattern-diagonal text-fg opacity-[0.05]" />
            <div className="relative">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                Section 03 — Works
              </span>
              <h2 data-reveal="mask" className="font-heavy text-5xl md:text-7xl uppercase mt-4 leading-[0.85] tracking-tighter">
                Selected<br />Works
              </h2>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 px-6 md:px-10 py-8 md:py-12 flex items-end justify-between gap-6">
            <p className="text-base md:text-lg font-medium text-fg-muted max-w-xl leading-snug">
              Three featured engagements from 2025. Full index available at <span className="text-fg font-bold">/works</span>.
            </p>
            <span className="hidden md:inline-flex shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-fg">
              03 / Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={idx}
                className={`project-card grid grid-cols-12 border-b-2 border-border ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
              >
                {/* Image block */}
                <div className={`col-span-12 md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[520px] overflow-hidden bg-bg-elevated border-b-2 md:border-b-0 ${isEven ? 'md:border-r-2' : 'md:border-l-2'} border-border`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                  />
                  {/* Frame & label */}
                  <div className="absolute inset-0 bg-fg/0 group-hover:bg-fg/20 transition-colors duration-200" />
                  <div className="absolute top-0 left-0 px-4 py-2 bg-bg border-b-2 border-r-2 border-border">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg">
                      Fig. 0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 px-4 py-2 bg-accent">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Detail block */}
                <div className="col-span-12 md:col-span-5 px-6 md:px-10 py-8 md:py-12 flex flex-col justify-between gap-8 fade-up">
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-border">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent">
                        P/0{idx + 1} — {project.category}
                      </span>
                    </div>
                    <h3 className="font-heavy text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tighter mt-6 text-fg">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-fg-muted leading-snug mt-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 border-2 border-border text-fg"
                        >
                          <TechIcon name={t} className="w-3 h-3" />
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2 border-border">
                      <a
                        href={project.live}
                        className="hover-trigger flex items-center justify-between gap-2 px-4 py-3 bg-fg text-bg hover:bg-accent hover:text-white transition-colors duration-200 group"
                      >
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">View Project</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" strokeWidth={2.5} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-trigger flex items-center justify-between gap-2 px-4 py-3 bg-bg text-fg border-t-2 sm:border-t-0 sm:border-l-2 border-border hover:bg-fg hover:text-bg transition-colors duration-200 group"
                      >
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Source</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid grid-cols-12 border-b-2 border-border">
          <a
            href="/projects"
            className="hover-trigger col-span-12 md:col-span-6 md:col-start-7 group flex items-center justify-between gap-4 px-6 md:px-10 py-7 bg-bg text-fg border-l-0 md:border-l-2 border-border hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200"
          >
            <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em]">View Full Index — All Works</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* 04 — System (Skills marquee) — inverted contrast strip */}
      <section className="relative bg-fg text-bg border-y-2 border-border overflow-hidden py-10 space-y-6">
        <div className="absolute inset-0 swiss-pattern-grid text-bg opacity-[0.05] pointer-events-none" />
        <div className="relative px-6 md:px-10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
          <span className="text-accent">Section 04 — System</span>
          <span className="hidden sm:inline">Stack & Tooling · 25+</span>
        </div>
        <div ref={marqueeRef} className="relative flex whitespace-nowrap will-change-transform">
          {MARQUEE_SKILLS.map((skill, idx) => (
            <span key={idx} className="text-6xl md:text-8xl font-heavy uppercase mx-6 tracking-tighter">
              {skill}
              <span className="text-accent mx-3">/</span>
            </span>
          ))}
        </div>
        <div ref={marqueeRevRef} className="relative flex whitespace-nowrap will-change-transform">
          {MARQUEE_SKILLS_REV.map((skill, idx) => (
            <span key={idx} className="text-5xl md:text-7xl font-heavy uppercase mx-6 tracking-tighter opacity-60">
              {skill}
              <span className="text-accent mx-3 opacity-100">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* 05 — Trajectory (Experience horizontal scroll) — inverted */}
      <div ref={horizontalPinRef} className="relative h-screen w-full bg-bg text-fg overflow-hidden border-b-2 border-border">
        <div ref={horizontalContainerRef} className="flex h-full" style={{ width: `${(EXPERIENCE.length + 1) * 100}vw` }}>

          {/* Header slide */}
          <div className="w-screen h-full shrink-0 grid grid-cols-12 border-r-2 border-border relative overflow-hidden">
            <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.05]" />
            <div className="relative col-span-12 md:col-span-8 flex flex-col justify-center px-6 md:px-12">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                Section 05 — Trajectory
              </span>
              <h2 className="font-heavy text-7xl md:text-[14vw] uppercase leading-[0.85] tracking-tighter mt-6 text-fg">
                Experience
              </h2>
              <p className="mt-8 max-w-md text-base md:text-lg font-medium text-fg-muted leading-snug">
                A journey of coordinating AI initiatives, developing digital experiences, and managing
                global data workflows.
              </p>
            </div>
            <div className="hidden md:flex relative col-span-4 border-l-2 border-border flex-col justify-between p-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
                Index
              </span>
              <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-fg">
                {EXPERIENCE.map((e, i) => (
                  <span key={i}>0{i + 1} — {e.role.split('&')[0].trim()}</span>
                ))}
                <span className="text-accent">→ Scroll</span>
              </div>
            </div>
          </div>

          {/* Experience slides */}
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="w-screen h-full shrink-0 grid grid-cols-12 border-r-2 border-border relative overflow-hidden">
              <div className="absolute inset-0 swiss-pattern-dots text-fg opacity-[0.04]" />
              <div className="relative col-span-12 md:col-span-3 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col justify-between p-6 md:p-10">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                    Position 0{idx + 1}
                  </span>
                  <p className="font-heavy text-3xl md:text-5xl uppercase leading-[0.9] tracking-tighter mt-4 text-fg">
                    {exp.duration}
                  </p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-fg-subtle mt-8 md:mt-0">
                  <div>{exp.period}</div>
                  <div className="text-fg mt-1">{exp.location}</div>
                </div>
              </div>

              <div className="relative col-span-12 md:col-span-9 flex flex-col justify-center p-6 md:p-12">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
                  {exp.company}
                </span>
                <h3 className="font-heavy text-4xl md:text-7xl lg:text-[8vw] uppercase leading-[0.9] tracking-tighter mt-4 text-fg">
                  {exp.role.split('&').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part.trim()}
                      {i < arr.length - 1 && (
                        <>
                          {' '}<span className="text-accent">&</span>{' '}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </h3>
                <p className="mt-6 max-w-2xl text-base md:text-lg font-medium text-fg-muted leading-snug">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 06 — Contact (vertical section, anchor target) */}
      <section id="contact" className="relative w-full bg-bg text-fg border-b-2 border-border">
        <div className="grid grid-cols-12 min-h-[80vh] md:min-h-[70vh]">
          <div className="relative col-span-12 md:col-span-8 flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 border-b-2 md:border-b-0 md:border-r-2 border-border overflow-hidden">
            <div className="absolute inset-0 swiss-pattern-grid text-fg opacity-[0.06]" />
            <div className="relative">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                Section 06 — Contact
              </span>
              <h2 data-reveal="mask" className="font-heavy text-6xl sm:text-7xl md:text-9xl lg:text-[12vw] uppercase leading-[0.85] tracking-tighter mt-6 text-fg break-words">
                What's<br />Next?
              </h2>
              <p className="mt-8 max-w-lg text-base md:text-lg font-medium text-fg-muted leading-snug">
                Currently building agentic AI systems and coordinating global automation projects at
                Lifewood — always open to discussing new innovations and collaborations.
              </p>
            </div>
          </div>

          <a
            href="mailto:rebadomiarobert@gmail.com"
            className="hover-trigger relative col-span-12 md:col-span-4 flex flex-col justify-between gap-12 p-6 md:p-10 bg-accent text-white group min-h-[320px]"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
              Inquiry
            </span>
            <div>
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 group-hover:rotate-45 transition-transform duration-200" strokeWidth={2} />
              <div className="mt-6 font-heavy text-3xl md:text-5xl uppercase leading-[0.9] tracking-tighter">
                Start<br />Project
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] font-bold opacity-90 break-all">
                rebadomiarobert@gmail.com
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer — Swiss ledger */}
      <footer className="bg-bg text-fg border-t-2 border-border">
        <div className="grid grid-cols-12 border-b-2 border-border">
          <div className="col-span-12 md:col-span-5 px-6 md:px-10 py-10 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-border">
            <h3 className="font-heavy text-4xl md:text-6xl uppercase leading-[0.85] tracking-tighter">
              Joshua<br />Rebadomia
            </h3>
            <p className="mt-6 text-sm md:text-base font-medium text-fg-muted">
              AI Executive · Full-Stack Developer<br />
              BSIT — CIT-U · Cebu, Philippines
            </p>
          </div>

          <div className="col-span-12 md:col-span-3 px-6 md:px-10 py-10 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-border">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-6">
              Navigation
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '#about' },
                { label: 'Works', href: '/projects' },
                { label: 'Resume', href: '/Joshua_Rebadomia_Resume.pdf' },
                { label: 'Contact', href: 'mailto:rebadomiarobert@gmail.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover-trigger text-sm font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors duration-200">
                    — {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4 px-6 md:px-10 py-10 md:py-16">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-6">
              Channels
            </div>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://github.com/SHUUAA" target="_blank" rel="noopener noreferrer" className="hover-trigger inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors duration-200">
                  <SiGithub className="w-4 h-4 shrink-0" aria-hidden="true" />
                  GitHub / SHUUAA
                </a>
              </li>
              <li>
                <a href="mailto:rebadomiarobert@gmail.com" className="hover-trigger inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors duration-200">
                  <Mail className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+639972878044" className="hover-trigger inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors duration-200">
                  <Phone className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  +63 997 287 8044
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-6 md:px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
          <span>© 2026 Joshua Robert Rebadomia. All rights reserved.</span>
        </div>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
