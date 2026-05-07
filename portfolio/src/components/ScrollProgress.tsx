import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: true,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-14 left-0 right-0 h-1 bg-accent z-[101] pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
};

export default ScrollProgress;
