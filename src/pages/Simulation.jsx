/* Simulation.jsx — PhishGuard Forensic Lab page
   Renders all 5 attack-vector training modules in a scrollable layout.
   A sticky nav bar auto-highlights the active module based on scroll position.
   Coded by Lucky | Om Patel */

import WebsiteAnatomy from '../components/simulation/WebsiteAnatomy';
import EmailGallery from '../components/gallery/EmailGallery';
import QuishingLab from '../components/simulation/QuishingLab';
import HeaderForensicLab from '../components/simulation/HeaderForensicLab';
import OTPSimulator from '../components/simulation/OTPSimulator';
import SmishingSimulator from '../components/simulation/SmishingSimulator';
import { motion as Motion } from 'framer-motion';
import { Mail, MessageSquare, QrCode, FileSearch, ShieldCheck, Zap, ArrowDown, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Simulation() {
  // Tracks which section id is currently in the viewport for nav highlighting
  const [activeHash, setActiveHash] = useState('');

  // Controls whether Email Forensics or Landing Page Anatomy is shown in section 1
  const [anatomyTab, setAnatomyTab] = useState('email');

  // Each module maps to a section id used by the sticky nav and scroll spy
  const modules = [
    { id: 'anatomy',  name: 'Email Anatomy', icon: <Mail className="w-5 h-5" /> },
    { id: 'otp',      name: 'MFA/OTP Lab',   icon: <Zap className="w-5 h-5" /> },
    { id: 'quishing', name: 'QR/Quishing',   icon: <QrCode className="w-5 h-5" /> },
    { id: 'headers',  name: 'Headers Lab',   icon: <FileSearch className="w-5 h-5" /> },
    { id: 'smishing', name: 'SMS Defense',   icon: <MessageSquare className="w-5 h-5" /> },
  ];

  // Scroll spy: update activeHash when a section enters the visible area
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      modules.forEach((mod) => {
        const el = document.getElementById(mod.id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveHash(mod.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth-scroll to a section, offset by 120px to clear the sticky nav + lab nav
  const scrollToModule = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">

      {/* Sticky lab navigation — highlights active section on scroll */}
      <div className="sticky top-20 z-[90] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-4 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-cyan-500 font-black text-[10px] uppercase tracking-widest italic shrink-0">
            <ShieldCheck className="w-4 h-4" /> Lab Navigation
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => scrollToModule(mod.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeHash === mod.id
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-100 dark:bg-slate-900/50 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
                {mod.icon}
                <span className="hidden sm:inline">{mod.name}</span>
              </button>
            ))}
          </div>

          {/* Live indicator — decorative only */}
          <div className="hidden lg:flex items-center gap-2 text-emerald-500 font-bold text-[8px] uppercase tracking-[0.2em] italic shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Virtual Environment Live
          </div>
        </div>
      </div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-32 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        {/* ── Section 1: Phishing Forensic Lab ──────────────────────────
            Two sub-modes toggled by anatomyTab:
              'email' → EmailGallery  (click-to-reveal email hotspots)
              'web'   → WebsiteAnatomy (click beacons on browser mockups) */}
        <section id="anatomy" className="relative pt-12">
          <div className="space-y-4 mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-cyan-500"><Mail className="w-10 h-10" /></span>
              Phishing Forensic Lab
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Deconstruct phishing attacks across two vectors: emails in your inbox and malicious landing pages. Click numbered beacons to reveal the exact tactic behind each red flag.
            </p>
          </div>

          {/* Tab switcher: Email Forensics vs Landing Page Anatomy */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 gap-1">
              <button
                onClick={() => setAnatomyTab('email')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${anatomyTab === 'email' ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Mail className="w-4 h-4" /> Email Forensics
              </button>
              <button
                onClick={() => setAnatomyTab('web')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${anatomyTab === 'web' ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Globe className="w-4 h-4" /> Landing Pages
              </button>
            </div>
          </div>

          {anatomyTab === 'email' ? <EmailGallery /> : <WebsiteAnatomy />}
        </section>

        {/* ── Section 2: MFA/OTP Interception Simulator ─────────────────
            Dual-pane simulation: victim's phishing page on the left,
            attacker's real-time C2 console on the right. */}
        <section id="otp" className="relative">
          <div className="space-y-4 mb-32 text-center max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-32">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-amber-500"><Zap className="w-10 h-10" /></span>
              MFA Interception Simulator
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Experience the "Attacker's Console" perspective. See how multi-factor authentication is bypassed using real-time credential harvesting and dynamic OTP request hijacking.
            </p>
            <div className="animate-bounce pt-8 flex justify-center">
              <ArrowDown className="text-slate-300 w-6 h-6" />
            </div>
          </div>
          <OTPSimulator />
        </section>

        {/* ── Section 3: QR Code / Quishing Lab ─────────────────────────
            Interactive scanner that reveals why QR codes are an invisible threat. */}
        <section id="quishing" className="relative">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-32">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-emerald-500"><QrCode className="w-10 h-10" /></span>
              Quishing Simulation
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Analyze malicious QR patterns. Learn how attackers weaponize physical space using deceptively branded QR codes in restaurants, parking meters, and public displays.
            </p>
          </div>
          <QuishingLab />
        </section>

        {/* ── Section 4: Email Header Forensic Lab ──────────────────────
            Parses raw email headers to expose sender spoofing and origin IP. */}
        <section id="headers" className="relative">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-32">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-rose-500"><FileSearch className="w-10 h-10" /></span>
              Header Analysis Lab
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Inspect raw technical metadata. Analyze SPF, DKIM, and DMARC signatures to identify spoofing and origin anomalies that are invisible to the naked eye.
            </p>
          </div>
          <HeaderForensicLab />
        </section>

        {/* ── Section 5: Smishing (SMS Phishing) Simulator ──────────────
            Phone mockup with per-scenario forensic beacon overlays + classify game. */}
        <section id="smishing" className="relative">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-32">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-indigo-500"><MessageSquare className="w-10 h-10" /></span>
              Mobile Attack Vector
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Educational simulations of Smishing (SMS phishing) attacks. Identify mobile-specific deceptive patterns like urgent package delivery alerts and fake system updates.
            </p>
          </div>
          <SmishingSimulator />
        </section>

      </Motion.div>
    </div>
  );
}
