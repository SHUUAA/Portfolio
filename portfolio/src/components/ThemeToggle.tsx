import React, { useRef } from 'react';
import gsap from 'gsap';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  const handleClick = () => {
    if (animatingRef.current) return;
    const btn = buttonRef.current;
    if (!btn) {
      toggleTheme();
      return;
    }

    animatingRef.current = true;

    // Capture the OLD background before swap
    const oldBg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0a0a0a';

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    // Overlay holds the OLD background; we shrink it down to reveal the NEW theme underneath
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${oldBg};
      z-index: 9997;
      pointer-events: none;
      will-change: clip-path;
      clip-path: circle(${maxR}px at ${cx}px ${cy}px);
    `;
    document.body.appendChild(overlay);

    // Swap theme immediately — page underneath is now the new theme
    toggleTheme();

    gsap.to(overlay, {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        overlay.remove();
        animatingRef.current = false;
      },
    });

    // Spin the toggle for a tactile flourish
    gsap.fromTo(
      btn,
      { rotate: 0 },
      { rotate: 360, duration: 0.9, ease: 'power3.inOut', clearProps: 'rotate' }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="hover-trigger relative inline-flex items-center justify-center w-full h-full text-fg hover:bg-fg hover:text-bg transition-colors duration-200 overflow-hidden"
    >
      <Sun
        className={`absolute w-4 h-4 transition-all duration-200 ${
          isDark ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
        strokeWidth={2.5}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-200 ${
          isDark ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
        }`}
        strokeWidth={2.5}
      />
    </button>
  );
};

export default ThemeToggle;
