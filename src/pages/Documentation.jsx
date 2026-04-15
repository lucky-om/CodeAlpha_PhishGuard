// Coded by Lucky

import { motion as Motion } from 'framer-motion';
import { Book, Shield, Terminal, Mail, Info, AlertTriangle, Lock, Globe } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      title: 'Platform Overview',
      icon: <Info className="w-6 h-6 text-cyan-500" />,
      content: 'PhishGuard is an advanced cybersecurity awareness platform designed to educate users on the latest social engineering threats. It combines interactive simulations with real-time analysis tools to provide a hands-on learning experience.'
    },
    {
      title: 'Link Analyzer',
      icon: <Terminal className="w-6 h-6 text-cyan-500" />,
      content: 'The in-browser analyzer uses 12 heuristic checks to identify malicious URL structures. It detects typosquatting, homograph attacks, URL shorteners, IP-based domains, and high-risk TLDs — all without sending your data anywhere.'
    },
    {
      title: 'Simulation Lab',
      icon: <Mail className="w-6 h-6 text-cyan-500" />,
      content: 'The simulation lab provides high-fidelity reconstructions of common phishing attacks across multiple vectors: Email (with interactive hotspots), SMS Smishing, QR Quishing, MFA/OTP interception, and email header forensics.'
    },
    {
      title: 'Threat Encyclopedia',
      icon: <Book className="w-6 h-6 text-cyan-500" />,
      content: 'A comprehensive knowledge base covering 8 modern attack vectors including Qushing (QR code phishing), Vishing (voice phishing), Angler Phishing (social media impersonation), and Whaling (executive targeting).'
    },
    {
      title: 'Privacy & Data',
      icon: <Lock className="w-6 h-6 text-cyan-500" />,
      content: 'All URL analysis is performed client-side in your browser using heuristics — no data is ever sent to external servers. PhishGuard operates with zero backend and zero telemetry.'
    }
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-12 pb-20 mt-10"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-mono font-bold uppercase">
          Platform Reference
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Platform Documentation</h1>
        <p className="text-slate-500">Master the tools and concepts of PhishGuard Intel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex gap-6 hover:border-cyan-500/30 transition-all group">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
              {section.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-3xl space-y-4">
        <h3 className="text-xl font-bold text-rose-500 flex items-center gap-2">
           <AlertTriangle className="w-5 h-5" /> Educational Use Only
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          All simulations within this platform are strictly for educational cybersecurity awareness. Never enter real sensitive information into the simulation demos. PhishGuard does not store any input data from the Link Analyzer — all processing is local.
        </p>
        <p className="text-xs text-slate-400 italic">Built for educational cybersecurity awareness.</p>
      </div>
    </Motion.div>
  );
}
