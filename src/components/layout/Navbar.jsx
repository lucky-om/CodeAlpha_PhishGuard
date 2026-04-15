// Coded by Lucky
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Menu, X, Search, Layout, BookOpen, GraduationCap, Shield, Home } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',          path: '/',             icon: <Home className="w-4 h-4" /> },
  { name: 'Encyclopedia',  path: '/encyclopedia',  icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Phish Anatomy', path: '/simulation',    icon: <Layout className="w-4 h-4" /> },
  { name: 'Link Analyzer', path: '/analyzer',      icon: <Search className="w-4 h-4" /> },
  { name: 'Security Quiz', path: '/quiz',          icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Prevention',    path: '/prevention',    icon: <Shield className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Close menu + track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close on outside click / touch
  useEffect(() => {
    if (!isMenuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close); };
  }, [isMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled
          ? 'bg-slate-950/95 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-slate-950/80 backdrop-blur-lg'
        } border-b border-slate-800`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="PhishGuard Home">
            <div className="p-2 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
              <ShieldCheck className="w-7 h-7 text-cyan-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black font-mono tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                PHISH<span className="text-cyan-500">GUARD</span>
              </span>
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">
                Defense System
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 gap-1 overflow-x-auto no-scrollbar">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-[10px] md:text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-500 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Status badge + mobile toggle */}
          <div className="flex items-center gap-3 shrink-0">


            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-500 hover:bg-slate-800 hover:border-cyan-500/40 transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur-xl absolute top-[80px] w-full shadow-2xl shadow-black/40"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link, idx) => (
                <Motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-2xl text-sm font-semibold transition-all ${isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25'
                        : 'text-slate-400 hover:bg-slate-900 border border-transparent'
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
