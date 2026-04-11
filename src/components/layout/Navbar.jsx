/* coded by lucky */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, ShieldCheck, Menu, X, Terminal, Mail, Info, FileText, Book, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { score, progress } = useGame();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Info className="w-4 h-4" /> },
    { name: 'Encyclopedia', path: '/encyclopedia', icon: <Book className="w-4 h-4" /> },
    { name: 'Phish Anatomy', path: '/simulation', icon: <Mail className="w-4 h-4" /> },
    { name: 'AI Analyzer', path: '/analyzer', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Security Quiz', path: '/quiz', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Prevention', path: '/prevention', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="p-2 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all group-hover:rotate-12">
              <ShieldCheck className="w-7 h-7 text-cyan-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black font-mono tracking-tighter text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors italic">
                PHISH<span className="text-cyan-500 uppercase">GUARD</span>
              </span>
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">by LUCKY</span>
            </div>
          </NavLink>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                      isActive 
                        ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md scale-105' 
                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Theme & Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-4 px-5 py-2.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[9px] uppercase font-black text-slate-500 dark:text-slate-500 tracking-widest">Shield Status</span>
                <span className="font-mono font-black text-emerald-500 text-xs">{score}% SECURE</span>
              </div>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <Motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-all text-slate-600 dark:text-slate-400 shadow-xl"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <Motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </Motion.div>
                ) : (
                  <Motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="w-5 h-5 text-indigo-500" />
                  </Motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
        <Motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]"
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 absolute top-[80px] w-full shadow-2xl"
          >
            <div className="p-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                      isActive 
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
