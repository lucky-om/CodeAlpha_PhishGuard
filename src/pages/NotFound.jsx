// Coded by Lucky
import { motion as Motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="relative z-10">
          <ShieldAlert className="w-32 h-32 text-rose-500 animate-pulse mx-auto" />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-rose-500/20 rounded-full blur-xl animate-ping" />
      </Motion.div>

      <Motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-8xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter italic"
      >
        404
      </Motion.h1>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          Unauthorized Access / Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          The security perimeter has been breached, or more likely, the page you are looking for has been purged or moved. Return to the secure zone.
        </p>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <NavLink
          to="/"
          className="group flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Secure Home
        </NavLink>

        <NavLink
          to="/simulation"
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-800 dark:hover:bg-white"
        >
          <Zap className="w-4 h-4 text-amber-500" />
          Start Simulation
        </NavLink>
      </Motion.div>

      {/* Decorative Terminal Line */}
      <div className="mt-20 font-mono text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] flex items-center gap-4">
        <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
        Error: 0x404_PAGE_MISSING_IN_CORE
        <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
