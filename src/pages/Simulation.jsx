/* coded by lucky */
import WebsiteAnatomy from '../components/simulation/WebsiteAnatomy';
import EmailGallery from '../components/gallery/EmailGallery';
import QuishingLab from '../components/simulation/QuishingLab';
import HeaderForensicLab from '../components/simulation/HeaderForensicLab';
import OTPSimulator from '../components/simulation/OTPSimulator';
import { motion as Motion } from 'framer-motion';
import { Mail, MessageSquare, QrCode, FileSearch, ShieldCheck, Globe, Zap, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Simulation() {
  const [activeHash, setActiveHash] = useState('');

  const modules = [
    { id: 'anatomy', name: 'Email Anatomy', icon: <Mail className="w-5 h-5" /> },
    { id: 'otp', name: 'MFA/OTP Lab', icon: <Zap className="w-5 h-5" /> },
    { id: 'quishing', name: 'QR/Quishing', icon: <QrCode className="w-5 h-5" /> },
    { id: 'headers', name: 'Headers Lab', icon: <FileSearch className="w-5 h-5" /> },
    { id: 'smishing', name: 'SMS Defense', icon: <MessageSquare className="w-5 h-5" /> },
  ];

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

  const scrollToModule = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120, // Adjust for sticky header
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Module Jump Menu (Sticky) */}
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

           <div className="hidden lg:flex items-center gap-2 text-emerald-500 font-bold text-[8px] uppercase tracking-[0.2em] italic shrink-0">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             Virtual Environment Live
           </div>
        </div>
      </div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-32 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Module: Email Anatomy */}
        <section id="anatomy" className="relative pt-12">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 italic uppercase tracking-tighter">
              <span className="text-cyan-500"><Mail className="w-10 h-10" /></span>
              Phishing Forensic Lab
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Dive deep into high-fidelity email and landing page deconstructions. Hover and click to investigate tactical markers used by state-level and commercial threat actors.
            </p>
          </div>
          <EmailGallery />
        </section>

        {/* Module: MFA/OTP Lab */}
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

        {/* Module: QR/Quishing */}
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

        {/* Module: Headers Lab */}
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

        {/* Module: SMS Defense */}
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
          <div className="p-8 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 shadow-2xl">
             <WebsiteAnatomy />
          </div>
        </section>

      </Motion.div>
    </div>
  );
}
