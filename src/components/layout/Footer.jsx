// Coded by Lucky
import { ShieldCheck, Mail, Globe, BookOpen, ShieldAlert, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const socialLinks = [
  {
    href: 'https://github.com/lucky-om/CodeAlpha_PhishGuard',
    label: 'GitHub Repository',
    icon: GithubIcon,
    hoverColor: 'hover:bg-white hover:text-slate-900',
    hoverBorder: 'hover:border-white/30',
  },
  {
    href: 'https://www.linkedin.com/in/lucky-om',
    label: 'LinkedIn Profile',
    icon: LinkedinIcon,
    hoverColor: 'hover:bg-blue-600 hover:text-white',
    hoverBorder: 'hover:border-blue-500/30',
  },
  {
    href: 'https://instagram.com/universe.lucky/',
    label: 'Instagram Profile',
    icon: InstagramIcon,
    hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white',
    hoverBorder: 'hover:border-pink-500/30',
  },
  {
    href: 'https://phishguard.luckyverse.tech',
    label: 'PhishGuard Website',
    icon: Globe,
    hoverColor: 'hover:bg-emerald-500 hover:text-white',
    hoverBorder: 'hover:border-emerald-500/30',
  },
];

const toolLinks = [
  { name: 'Link Analyzer', path: '/analyzer' },
  { name: 'Forensic Lab', path: '/simulation' },
  { name: 'Threat Wiki', path: '/encyclopedia' },
  { name: 'Security IQ Quiz', path: '/quiz' },
];

const aboutLinks = [
  { name: 'Technical Docs', path: '/documentation', icon: BookOpen, external: false },
  { name: 'Privacy Protocol', path: '/privacy', icon: ShieldAlert, external: false },
  { name: 'Prevention Hub', path: '/prevention', icon: Zap, external: false },
  { name: 'Source Code', path: 'https://github.com/lucky-om/CodeAlpha_PhishGuard', icon: ArrowUpRight, external: true },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Gradient separator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/0 group-hover:border-cyan-500/20 shadow-lg group-hover:shadow-cyan-500/10">
                <ShieldCheck className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black font-mono tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                  PHISH<span className="text-cyan-500">GUARD</span>
                </span>
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">
                  Defense System
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
              A comprehensive toolkit to simulate, analyze, and learn about phishing attacks.
              Protect yourself with local, browser-based threat detection — no data leaves your device.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon, hoverColor, hoverBorder }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`group/soc p-3 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 transition-all duration-300 shadow-sm ${hoverColor} ${hoverBorder} hover:scale-110 hover:shadow-lg active:scale-95`}
                >
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover/soc:scale-110" />
                </a>
              ))}
            </div>

            {/* Contact pill */}
            <a
              href="mailto:omp48095@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-bold hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 group/mail w-fit"
            >
              <Mail className="w-3.5 h-3.5 group-hover/mail:animate-bounce" />
              support@phishguard.luckyverse.tech
            </a>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-6 font-mono flex items-center gap-2">
              <span className="w-4 h-[1px] bg-cyan-500/60 inline-block" />
              Tools
            </h4>
            <ul className="space-y-3.5">
              {toolLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-500 hover:text-cyan-400 transition-all duration-200 flex items-center gap-2 group/link"
                  >
                    <span className="w-0 group-hover/link:w-3 h-[1.5px] bg-cyan-500 transition-all duration-300 rounded-full shrink-0" />
                    <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-6 font-mono flex items-center gap-2">
              <span className="w-4 h-[1px] bg-cyan-500/60 inline-block" />
              About
            </h4>
            <ul className="space-y-3.5">
              {aboutLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-white transition-all duration-200 flex items-center gap-2 group/link"
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0 group-hover/link:rotate-12 group-hover/link:text-cyan-400 transition-all duration-200" />
                        <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{item.name}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-sm text-slate-500 hover:text-white transition-all duration-200 flex items-center gap-2 group/link"
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0 group-hover/link:text-cyan-400 transition-colors duration-200" />
                        <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{item.name}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            &copy; {currentYear} PhishGuard All rights reserved by <Link to="https://luckyverse.tech" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 transition-colors duration-200">Lucky</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
