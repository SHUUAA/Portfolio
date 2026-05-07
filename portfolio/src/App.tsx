import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);
import { Hero } from './components/Hero';
import { Sections } from './components/Sections';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Projects } from './pages/Projects';
import { ScrollProgress } from './components/ScrollProgress';
import { useTheme } from './hooks/useTheme';

// Smoothly scroll to the URL hash via Lenis after route changes.
// The setTimeout gives the route's content time to mount before measuring.
const ScrollToHash: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const target = location.hash;
    const id = window.setTimeout(() => {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(target, { offset: -56 });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.hash]);
  return null;
};

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize theme — applies .dark class to <html> and persists choice
  useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger so scroll-triggered animations
    // and the velocity hook fire correctly under smooth scroll.
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="relative w-full bg-bg text-fg overflow-hidden font-sans min-h-screen transition-colors duration-300">
      <CustomCursor />

      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}
      >
        <ScrollProgress />
        <Navbar />
        <ScrollToHash />

        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Sections />
            </main>
          } />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </div>
  );
}
