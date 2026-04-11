import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate the main text character by character
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.set(chars, { yPercent: 130, opacity: 0 });
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out'
      });
    }

    // Floating images parallax effect
    const images = imagesRef.current?.querySelectorAll('.floating-img');
    if (images) {
      tl.fromTo(images, 
        { scale: 0, opacity: 0, rotation: () => Math.random() * 20 - 10 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: 'back.out(1.5)',
          clearProps: 'all'
        }, 
        "-=0.5"
      );

      // Mouse movement subtle parallax for images
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        gsap.to(images, {
          x: x,
          y: y,
          stagger: 0.02,
          duration: 1,
          ease: 'power2.out'
        });
      });
    }
  }, { scope: containerRef });

  // Split text helper to wrap words so they don't break across lines
  const splitText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-flex overflow-hidden">
        {word.split('').map((char, i) => (
          <span key={i} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#F3F4F6] px-4 pt-20">
      
      {/* Background large text outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[30vw] font-heavy leading-none text-outline whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-[90vw] mx-auto text-center flex flex-col items-center">
        
        <p className="text-sm md:text-md uppercase tracking-[0.4em] mb-4 font-semibold text-gray-500 overflow-hidden text-center mx-auto max-w-3xl leading-relaxed">
          <span className="block translate-y-full opacity-0 animate-[slideUp_1s_ease-out_1s_forwards]">
            Agentics - AI Integration · Full Stack Developer · Web Developer · App Developer
          </span>
        </p>

        <h1 ref={textRef} className="font-heavy text-[9vw] sm:text-[10vw] leading-[0.85] tracking-tighter text-black uppercase flex flex-wrap justify-center overflow-hidden gap-[0.25em]">
          {splitText("JOSHUA ROBERT REBADOMIA")}
        </h1>
        
        <div className="mt-8 overflow-hidden">
          <p className="max-w-md mx-auto text-sm md:text-base text-gray-600 font-medium translate-y-full opacity-0 animate-[slideUp_1s_ease-out_1.5s_forwards]">
            I am a passionate IT professional focused on building impactful digital solutions. Specializing in modern web development.
          </p>
        </div>
      </div>

      {/* Floating profile images */}
      <div ref={imagesRef} className="absolute inset-0 pointer-events-none flex justify-center items-center">
        {/* Top Left */}
        <div className="floating-img absolute top-[15%] left-[10%] w-[15vw] max-w-[200px] aspect-[3/4] rotate-[-10deg]">
          <img src="/joshua.jpg" alt="Profile" className="w-full h-full object-cover grayscale brightness-90 contrast-125 object-top border-4 border-white shadow-2xl" />
        </div>
        
        {/* Bottom Right */}
        <div className="floating-img absolute bottom-[15%] right-[10%] w-[18vw] max-w-[240px] aspect-square rotate-[5deg]">
          <img src="/joshua.jpg" alt="Profile" className="w-full h-full object-cover grayscale brightness-90 contrast-125 object-center border-4 border-white shadow-2xl" />
        </div>

        {/* Top Right (Small) */}
        <div className="floating-img absolute top-[25%] right-[20%] w-[10vw] max-w-[140px] aspect-[4/5] rotate-[15deg]">
          <img src="/joshua.jpg" alt="Profile" className="w-full h-full object-cover grayscale opacity-80 object-bottom border-4 border-white shadow-xl" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">Scroll Down</span>
      </div>
    </section>
  );
};
