import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const logEntries = [
  { threshold: 0, text: "INIT: Booting portfolio application kernel..." },
  { threshold: 10, text: "INIT: Activating React WebGL canvas modules..." },
  { threshold: 20, text: "SYS: Binding Lenis smooth-scrolling engine..." },
  { threshold: 30, text: "SYS: Hydrating Swiss International design grid..." },
  { threshold: 42, text: "THREE: Initializing Rapier physics engine..." },
  { threshold: 54, text: "THREE: Binding Canvas WebGL rendering context..." },
  { threshold: 65, text: "SYS: Mounting Three.js 3D renderer context..." },
  { threshold: 76, text: "AI: Activating Chatbot pipeline & neural weights..." },
  { threshold: 88, text: "UI: Injecting scroll-triggered GSAP behaviors..." },
  { threshold: 95, text: "SYS: Verification pass complete. Preloading done." },
  { threshold: 99, text: "READY: Executing system handoff. Welcome." },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  // Dynamic logs computed reactively from current progress
  const activeLogs = logEntries
    .filter((entry) => progress >= entry.threshold)
    .map((entry) => entry.text);

  // Background Canvas Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.03;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.03;
    };
    window.addEventListener('mousemove', handleMouseMove);

    interface TechPoint {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      label: string;
    }

    const points: TechPoint[] = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      label: `SYS_ND_${i.toString().padStart(2, '0')}_${Math.floor(Math.random() * 900 + 100)}`
    }));

    const drawGrid = () => {
      const borderVal = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
      ctx.strokeStyle = borderVal;
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = 1;

      const gridSize = 48;
      const startX = mouse.x % gridSize;
      for (let x = startX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const startY = mouse.y % gridSize;
      for (let y = startY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    };

    const drawTechElements = (time: number) => {
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim();

      // Render floating points & coordinates
      points.forEach((pt) => {
        pt.x += pt.speedX;
        pt.y += pt.speedY;

        // Wrap edges
        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;

        const renderX = pt.x + mouse.x * 0.4;
        const renderY = pt.y + mouse.y * 0.4;

        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(renderX, renderY, pt.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = fgColor;
        ctx.globalAlpha = 0.25;
        ctx.font = '8px ui-monospace, SF Mono, Menlo, monospace';
        ctx.fillText(
          `${pt.label} (${Math.round(renderX)}, ${Math.round(renderY)})`,
          renderX + 8,
          renderY + 3
        );
      });

      // Draw a rotating radar or geometric crosshair in center background
      ctx.save();
      ctx.translate(width / 2 + mouse.x * 0.25, height / 2 + mouse.y * 0.25);
      ctx.rotate(time * 0.0004);

      ctx.strokeStyle = fgColor;
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 0.03;
      ctx.setLineDash([2, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 170, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
      ctx.moveTo(0, -15); ctx.lineTo(0, 15);
      ctx.stroke();

      const bSize = 100;
      const len = 12;
      ctx.strokeStyle = fgColor;
      ctx.globalAlpha = 0.08;
      // top left
      ctx.beginPath();
      ctx.moveTo(-bSize + len, -bSize); ctx.lineTo(-bSize, -bSize); ctx.lineTo(-bSize, -bSize + len);
      ctx.stroke();
      // top right
      ctx.beginPath();
      ctx.moveTo(bSize - len, -bSize); ctx.lineTo(bSize, -bSize); ctx.lineTo(bSize, -bSize + len);
      ctx.stroke();
      // bottom left
      ctx.beginPath();
      ctx.moveTo(-bSize + len, bSize); ctx.lineTo(-bSize, bSize); ctx.lineTo(-bSize, bSize - len);
      ctx.stroke();
      // bottom right
      ctx.beginPath();
      ctx.moveTo(bSize - len, bSize); ctx.lineTo(bSize, bSize); ctx.lineTo(bSize, bSize - len);
      ctx.stroke();

      ctx.restore();
      ctx.globalAlpha = 1.0;
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      drawGrid();
      drawTechElements(time);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Animation Timelines
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // 1. Fade out the text content elements
          gsap.to(contentRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              // 2. Staggered slide up of background panels
              gsap.to('.preloader-panel', {
                yPercent: -100,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.inOut',
                onComplete,
              });
            },
          });
        },
      });

      // Progress counter animation
      tl.to(
        { value: 0 },
        {
          value: 100,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate: function () {
            const v = Math.round(this.targets()[0].value);
            setProgress(v);
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: v / 100, transformOrigin: '0% 50%' });
            }
          },
        }
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] text-fg flex flex-col overflow-hidden select-none pointer-events-auto"
    >
      {/* Background Curtain Panels */}
      <div className="absolute inset-0 flex pointer-events-none z-0">
        <div className="preloader-panel flex-1 bg-bg border-r border-border/10 last:border-r-0 h-full w-full" />
        <div className="preloader-panel flex-1 bg-bg border-r border-border/10 last:border-r-0 h-full w-full" />
        <div className="preloader-panel flex-1 bg-bg border-r border-border/10 last:border-r-0 h-full w-full" />
        <div className="preloader-panel flex-1 bg-bg border-r border-border/10 last:border-r-0 h-full w-full" />
      </div>

      {/* Interactive Grid/Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-60"
      />

      {/* Foreground Content Wrapper */}
      <div
        ref={contentRef}
        className="preloader-content absolute inset-0 flex flex-col z-25 pointer-events-none"
      >
        {/* Top Ledger */}
        <div className="grid grid-cols-12 border-b-2 border-border bg-bg/20 backdrop-blur-[2px]">
          <div className="col-span-6 md:col-span-3 px-6 md:px-10 py-5 border-r-2 border-border text-[10px] uppercase tracking-[0.3em] font-bold">
            <span className="text-accent">00 / Loading</span>
          </div>
          <div className="hidden md:flex col-span-3 items-center px-6 md:px-10 py-5 border-r-2 border-border text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
            Joshua R. Rebadomia
          </div>
          <div className="hidden md:flex col-span-3 items-center px-6 md:px-10 py-5 border-r-2 border-border text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
            Portfolio · Vol. 04
          </div>
          <div className="col-span-6 md:col-span-3 flex items-center justify-end px-6 md:px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
            Edition 2026
          </div>
        </div>

        {/* Center Stage: Progress Counter & Technical Logs */}
        <div className="flex-1 grid grid-cols-12 items-center gap-6 py-8">
          {/* Big Digital Counter */}
          <div className="col-span-12 md:col-span-7 px-6 md:px-10 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
              Compiling System
            </span>
            <div className="font-heavy text-[24vw] md:text-[15vw] uppercase leading-[0.8] tracking-tighter mt-2 tabular-nums">
              {progress.toString().padStart(3, '0')}
            </div>
          </div>

          {/* Compilation Logs terminal */}
          <div className="col-span-12 md:col-span-5 px-6 md:px-10">
            <div className="font-mono-tight text-[10px] text-fg-subtle flex flex-col gap-1 overflow-hidden h-[160px] md:h-[220px] border border-border/20 p-4 bg-bg-elevated/40 backdrop-blur-sm rounded">
              <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] uppercase tracking-wider text-accent font-bold">System Log</span>
                </div>
                <span className="text-[9px] text-fg-subtle opacity-50 font-bold">V4.0.0</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1.5 overflow-hidden">
                {activeLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 items-start transition-opacity duration-300">
                    <span className="text-accent shrink-0 select-none">&gt;</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 bg-bg border-t-2 border-border">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 right-0 bg-accent"
            style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }}
          />
        </div>

        {/* Bottom Ledger */}
        <div className="grid grid-cols-12 border-t-2 border-border bg-bg/20 backdrop-blur-[2px]">
          <div className="col-span-12 md:col-span-8 px-6 md:px-10 py-5 border-b-2 md:border-b-0 md:border-r-2 border-border text-[10px] uppercase tracking-[0.3em] font-bold text-fg truncate">
            <span className="md:hidden">AI Exec · Full-Stack Dev</span>
            <span className="hidden md:inline">AI Executive · Full-Stack Developer</span>
          </div>
          <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-end gap-3 px-6 md:px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-fg-subtle">
            <span className="relative inline-flex h-2 w-2 bg-accent shrink-0" style={{ animation: 'blink 1.4s infinite' }} />
            <span>Loading System</span>
          </div>
        </div>
      </div>
    </div>
  );
};
