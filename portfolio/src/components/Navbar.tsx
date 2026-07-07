import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const LINKS: { label: string; to: string; external?: boolean; download?: boolean }[] = [
  { label: 'Index', to: '/' },
  { label: 'Subject', to: '/#about' },
  { label: 'Works', to: '/projects' },
  { label: 'Resume', to: '/Joshua_Rebadomia_Resume.pdf', external: true, download: true },
  { label: 'Contact', to: '/#contact' },
];

/** When already on the home page, scroll to the hero (top). */
const scrollToHero = () => {
  const lenis = (window as any).lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const Navbar: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  // Lock page scroll while mobile menu is open + flag <html> so other floating
  // UI (e.g. the chatbot) can hide itself while the drawer is up.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.overflow = 'hidden';
      root.dataset.navMenu = 'open';
    } else {
      root.style.overflow = '';
      delete root.dataset.navMenu;
    }
    return () => {
      root.style.overflow = '';
      delete root.dataset.navMenu;
    };
  }, [open]);

  // Close menu when window crosses into desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-bg border-b-2 border-border">
        <nav className="flex items-stretch h-14">
          {/* Mark — JR */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover-trigger flex items-center gap-2 px-4 lg:px-6 border-r-2 border-border hover:bg-fg hover:text-bg transition-colors duration-200 group shrink-0"
          >
            <span className="font-heavy text-base lg:text-lg uppercase tracking-tighter">JR</span>
            <span className="hidden lg:inline text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle group-hover:text-bg transition-colors duration-200">
              / Rebadomia
            </span>
          </Link>

          {/* Desktop status pill */}
          <div className="hidden lg:flex items-center gap-2.5 px-6 border-r-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold shrink-0">
            <span className="relative inline-flex h-2 w-2 bg-accent" style={{ animation: 'blink 1.4s infinite' }} />
            <span className="text-fg-subtle">Available</span>
            <span className="text-fg">· {time} CEB</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Mobile status pill */}
          <div className="flex lg:hidden items-center gap-2 px-3 sm:px-4 border-l-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold shrink-0">
            <span className="relative inline-flex h-2 w-2 bg-accent shrink-0" style={{ animation: 'blink 1.4s infinite' }} />
            <span className="text-fg tabular-nums">{time}</span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-stretch">
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  {...(l.download ? { download: true } : {})}
                  className="hover-trigger flex items-center px-4 xl:px-5 border-l-2 border-border text-xs font-bold uppercase tracking-[0.2em] text-fg overflow-hidden"
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
                  onClick={l.to === '/' && isHome ? (e) => { e.preventDefault(); scrollToHero(); } : undefined}
                  className="hover-trigger flex items-center px-4 xl:px-5 border-l-2 border-border text-xs font-bold uppercase tracking-[0.2em] text-fg overflow-hidden"
                >
                  <span className="swiss-link">
                    <span className="swiss-link-inner">{l.label}</span>
                    <span className="swiss-link-replace">{l.label}</span>
                  </span>
                </Link>
              )
            )}
          </div>

          {/* Desktop theme toggle */}
          <div className="hidden lg:flex items-center justify-center border-l-2 border-border w-14 shrink-0">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`lg:hidden hover-trigger flex items-center gap-2 px-4 border-l-2 border-border text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 shrink-0 ${
              open ? 'bg-accent text-white' : 'bg-bg text-fg hover:bg-fg hover:text-bg'
            }`}
          >
            <span className="relative inline-flex flex-col gap-1.5 w-4">
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-200 origin-center ${
                  open ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-200 origin-center ${
                  open ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </span>
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen drawer */}
      <div
        className={`fixed inset-0 z-[99] bg-bg flex flex-col pt-14 lg:hidden transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!open}
      >
        {/* Top status row */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold">
          <span className="flex items-center gap-2.5 min-w-0">
            <span className="relative inline-flex h-2 w-2 bg-accent shrink-0" style={{ animation: 'blink 1.4s infinite' }} />
            <span className="text-fg-subtle">Available</span>
            <span className="text-fg truncate">· {time} CEB</span>
          </span>
          <span className="text-fg-subtle shrink-0">00 / Menu</span>
        </div>

        {/* Links — large stacked Swiss style */}
        <ul className="flex flex-col flex-1 overflow-auto">
          {LINKS.map((l, i) =>
            l.external ? (
              <li key={l.label} className="border-b-2 border-border">
                <a
                  href={l.to}
                  {...(l.download ? { download: true } : {})}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 px-6 py-7 hover:bg-accent hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono-tight text-[10px] font-bold tracking-tight tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-heavy text-3xl uppercase tracking-tighter truncate">
                      {l.label}
                    </span>
                  </span>
                  <span className="text-2xl font-heavy shrink-0">→</span>
                </a>
              </li>
            ) : (
              <li key={l.label} className="border-b-2 border-border">
                <Link
                  to={l.to}
                  onClick={(e) => { setOpen(false); if (l.to === '/' && isHome) { e.preventDefault(); scrollToHero(); } }}
                  className="flex items-center justify-between gap-4 px-6 py-7 hover:bg-accent hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono-tight text-[10px] font-bold tracking-tight tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-heavy text-3xl uppercase tracking-tighter truncate">
                      {l.label}
                    </span>
                  </span>
                  <span className="text-2xl font-heavy shrink-0">→</span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Footer ledger */}
        <div className="border-t-2 border-border px-6 py-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] font-bold">
          <span className="text-fg-subtle truncate">Cebu, Philippines</span>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-fg">Theme</span>
            <div className="w-9 h-9 border-2 border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
