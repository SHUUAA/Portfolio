import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete
          });
        }
      });

      // Simple fake loader for demonstration
      tl.to({ value: 0 }, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value));
        }
      });

      tl.to(counterRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in"
      }, "+=0.2");
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="absolute top-8 left-8 text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
        Portfolio V2.0
      </div>
      
      <div 
        ref={counterRef}
        className="font-heavy text-[15vw] leading-none"
      >
        {progress}%
      </div>

      <div className="absolute bottom-12 text-sm font-light tracking-wide text-white/60">
        JOSHUA ROBERT REBADOMIA
      </div>
    </div>
  );
};
