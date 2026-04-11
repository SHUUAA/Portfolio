import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Sections } from './components/Sections';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { WebglBackground } from './components/WebglBackground';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Provide Lenis to global scope for ScrollTrigger sync if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="relative w-full bg-[#F3F4F6] text-black overflow-hidden font-sans min-h-screen">
      <CustomCursor />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div 
        className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}
      >
        <WebglBackground />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Sections />
            </main>
          } />
        </Routes>
      </div>
    </div>
  );
}
