import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const LINKS: { label: string; to: string; external?: boolean; download?: boolean }[] = [
  { label: 'Index', to: '/' },
  { label: 'Subject', to: '/#about' },
  { label: 'Works', to: '/projects' },
  { label: 'Resume', to: '/Joshua_Rebadomia_Resume.pdf', external: true, download: true },
  { label: 'Contact', to: 'mailto:rebadomiarobert@gmail.com', external: true },
];

export const Navbar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Manila',
      });
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-bg border-b-2 border-border">
      <nav className="flex items-stretch h-14">
        {/* Mark — JR */}
        <Link
          to="/"
          className="hover-trigger flex items-center gap-2 px-4 md:px-6 border-r-2 border-border hover:bg-fg hover:text-bg transition-colors duration-200 group shrink-0"
        >
          <span className="font-heavy text-base md:text-lg uppercase tracking-tighter">JR</span>
          <span className="hidden md:inline text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle group-hover:text-bg transition-colors duration-200">
            / Rebadomia
          </span>
        </Link>

        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2.5 px-6 border-r-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold shrink-0">
          <span className="relative inline-flex h-2 w-2 bg-accent" style={{ animation: 'blink 1.4s infinite' }} />
          <span className="text-fg-subtle">Available</span>
          <span className="text-fg">· {time} CEB</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Links — vertical slide hover */}
        <div className="flex items-stretch">
          {LINKS.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.to}
                {...(l.download ? { download: true } : {})}
                className="hover-trigger flex items-center px-3 md:px-5 border-l-2 border-border text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-fg overflow-hidden"
              >
                <span className="swiss-link">
                  <span className="swiss-link-inner">{l.label}</span>
                  <span className="swiss-link-replace">{l.label}</span>
                </span>
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="hover-trigger flex items-center px-3 md:px-5 border-l-2 border-border text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-fg overflow-hidden"
              >
                <span className="swiss-link">
                  <span className="swiss-link-inner">{l.label}</span>
                  <span className="swiss-link-replace">{l.label}</span>
                </span>
              </Link>
            )
          )}
        </div>

        {/* Theme toggle */}
        <div className="hidden md:flex items-center justify-center border-l-2 border-border w-14 shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
