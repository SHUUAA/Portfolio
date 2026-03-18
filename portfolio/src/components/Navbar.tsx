import React from 'react';
import { Link } from 'react-router-dom';
import GlassSurface from './GlassSurface';

interface NavbarProps {
  trackingEnabled: boolean;
  onToggleTracking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ trackingEnabled, onToggleTracking }) => {
  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={36}
        backgroundOpacity={0.15}
        blur={20}
        brightness={45}
        distortionScale={-120}
        className="px-4 md:px-10 py-3 md:py-4"
      >
        <div className="flex items-center justify-between w-full text-white/90">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            <span className="text-lg md:text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              PORTFOLIO
            </span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-cyan-400 transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <a href="/#projects" className="hover:text-cyan-400 transition-all duration-300 relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <Link to="/project" className="hover:text-cyan-400 transition-all duration-300 relative group">
              Project
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <a href="/#skills" className="hover:text-cyan-400 transition-all duration-300 relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/#contact" className="hover:text-cyan-400 transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onToggleTracking}
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-500 ${
                trackingEnabled 
                ? 'border-white/40 bg-white/10 text-white' 
                : 'border-white/10 bg-white/5 text-white/40'
              }`}
            >
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${trackingEnabled ? 'bg-white animate-pulse' : 'bg-white/20'}`} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">
                {trackingEnabled ? 'On' : 'Off'}
              </span>
            </button>

            <button className="hidden sm:block px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300">
              Let's Talk
            </button>
          </div>
        </div>
      </GlassSurface>
    </nav>
  );
};

export default Navbar;
