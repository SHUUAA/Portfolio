import React, { useRef } from 'react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    gsap.to(el, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(el, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center w-full mix-blend-difference px-4">
      <nav ref={containerRef} className="flex items-center gap-2 md:gap-6 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 text-white font-medium text-xs md:text-sm tracking-widest uppercase">
        <a 
          href="#home" 
          className="px-4 py-2 hover:text-gray-300 transition-colors inline-block whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          Home
        </a>
        <a 
          href="#about" 
          className="px-4 py-2 hover:text-gray-300 transition-colors inline-block whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          About
        </a>
        <a 
          href="#projects" 
          className="px-4 py-2 hover:text-gray-300 transition-colors inline-block whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          Projects
        </a>
        <a 
          href="#contact" 
          className="px-4 py-2 hover:text-gray-300 transition-colors inline-block whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};
export default Navbar;
