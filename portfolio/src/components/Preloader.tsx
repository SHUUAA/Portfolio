import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
            onComplete,
          });
        },
      });

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

      tl.to(
        counterRef.current,
        { opacity: 0, duration: 0.3, ease: 'power2.in' },
        '+=0.15'
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-bg text-fg flex flex-col"
    >
      {/* Top ledger */}
      <div className="grid grid-cols-12 border-b-2 border-border">
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

      {/* Counter — center stage */}
      <div className="flex-1 grid grid-cols-12 items-center">
        <div ref={counterRef} className="col-span-12 px-6 md:px-10 flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
            Compiling
          </span>
          <div className="font-heavy text-[28vw] md:text-[20vw] uppercase leading-[0.8] tracking-tighter mt-2 tabular-nums">
            {progress.toString().padStart(3, '0')}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1 bg-bg border-t-2 border-border">
        <div ref={barRef} className="absolute inset-y-0 left-0 right-0 bg-accent" style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }} />
      </div>

      {/* Bottom ledger */}
      <div className="grid grid-cols-12 border-t-2 border-border">
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
  );
};
