/* coded by lucky */
import { ShieldCheck, Mail, ExternalLink, Globe, Lock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

// Official Brand SVGs (Enterprise fallback)
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Column 1: Brand & Intel */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all group-hover:rotate-12">
                <ShieldCheck className="w-8 h-8 text-cyan-500" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black font-mono tracking-tighter text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors italic">
                  PHISH<span className="text-cyan-500 uppercase">GUARD</span>
                </span>
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">SECURE SYSTEM</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Enterprise-grade phishing simulation and threat detection intelligence. We empower users to identify and neutralize social engineering vectors before they compromise the network.
            </p>

            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/lucky-om" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                title="GitHub Repository"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/lucky-om" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://phishguard.intel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                title="Globe Intel"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500 mb-8 font-mono italic underline decoration-slate-800 underline-offset-8">Defensive Tools</h4>
            <ul className="space-y-4">
              {[
                { name: 'AI Link Analyzer', path: '/analyzer' },
                { name: 'Forensic Lab', path: '/simulation' },
                { name: 'Threat Wiki', path: '/encyclopedia' },
                { name: 'Security IQ Quiz', path: '/quiz' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-slate-600 dark:text-slate-500 hover:text-cyan-500 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-cyan-500 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600 mb-8 font-mono italic underline decoration-slate-800 underline-offset-8">Information</h4>
            <ul className="space-y-4">
               {[
                { name: 'Technical Docs', path: '/documentation' },
                { name: 'Privacy Protocol', path: '/privacy' },
                { name: 'Prevention Hub', path: '/prevention' },
                { name: 'Source Code', path: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
                     {item.name === 'Source Code' ? <ExternalLink className="w-3 h-3 group-hover:rotate-12" /> : <Lock className="w-3 h-3" />}
                     {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600 mb-8 font-mono italic underline decoration-slate-800 underline-offset-8">Integrity</h4>
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Shield className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Validated Platform</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                Secure implementation audit passed. No telemetry active in current session.
              </p>
              <a href="mailto:support@phishdefend.intel" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all">
                <Mail className="w-3.5 h-3.5" /> Support Channel
              </a>
            </div>
          </div>

        </div>

        {/* Global Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] italic leading-none">
              By Lucky | Om Patel
            </p>
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              Digital Defense Architect & Developer
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
               <span className="text-[9px] font-black text-emerald-500 tracking-widest uppercase italic">Verified Core v1.0.0</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">
              All rights reserved &copy; {currentYear} // Lucky
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
