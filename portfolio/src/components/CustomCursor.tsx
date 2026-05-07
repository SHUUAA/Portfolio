import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-trigger')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Sharp center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* Square ring — expands and turns red on interactive elements */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 ease-out border-2 ${
          isHovered
            ? 'w-12 h-12 border-[#FF3000] bg-[#FF3000]/10'
            : 'w-6 h-6 border-white bg-transparent'
        }`}
        style={{ mixBlendMode: isHovered ? 'normal' : 'difference' }}
      />
    </>
  );
};
