// Coded by Lucky

import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, ShieldCheck, AlertCircle, Key, ArrowRight, Smartphone, 
  PhoneCall, Terminal, Lock, Globe, Mail, Zap
} from 'lucide-react';

const preventionTechniques = [
  {
    id: 'mfa',
    title: 'Multi-Factor Authentication (MFA)',
    icon: <Smartphone className="w-10 h-10 text-cyan-500" />,
    color: 'bg-cyan-500/10',
    description: "Always enable hardware-based MFA (like YubiKey) or Authenticator apps. Even if an attacker steals your password, they cannot bypass the physical token or the time-based code on your device.",
    steps: ["Use Google Authenticator or Authy", "Avoid SMS-based MFA (SIM swapping risk)", "Store backup codes offline"]
  },
  {
    id: 'verify',
    title: 'Out-of-Band Verification',
    icon: <PhoneCall className="w-10 h-10 text-emerald-500" />,
    color: 'bg-emerald-500/10',
    description: "Never verify an urgent request through the same channel it arrived. If you get a 'suspicious' email from a bank or CEO, call them directly using a trusted number from an official website.",
    steps: ["Call back on a known number", "Verify via secure internal chat", "Never trust the contact info in the email"]
  },
  {
    id: 'url',
    title: 'URL & Certificate Inspection',
    icon: <Lock className="w-10 h-10 text-rose-500" />,
    color: 'bg-rose-500/10',
    description: "Always hover over links to see the true destination URL. Check for HTTPS and verify the SSL certificate issuer. Look for homograph attacks like 'rn' instead of 'm'.",
    steps: ["Hover before clicking", "Check for HTTPS lock icon", "Validate the exact domain spelling"]
  },
  {
    id: 'manager',
    title: 'Password Managers',
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    color: 'bg-yellow-500/10',
    description: "Use a reputable password manager. These tools won't auto-fill your credentials on a phishing site because they recognize that the domain does not match the stored entry.",
    steps: ["Use Bitwarden or 1Password", "Generate long, complex passwords", "One unique password per service"]
  }
];

export default function Prevention() {
  const [demoInput, setDemoInput] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-20 pb-20"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold uppercase">
           Security First Strategy
        </div>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          How to Prevent <br /> Phishing Attacks
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Phishing relies on human error. By implementing these technical and psychological guards, you can make yourself a hard target for even the most advanced attackers.
        </p>
      </div>

      {/* Prevention Techniques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {preventionTechniques.map((tech) => (
          <Motion.div
            key={tech.id}
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-all group"
          >
            <div className={`w-20 h-20 rounded-[1.5rem] ${tech.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
              {tech.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{tech.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {tech.description}
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
               {tech.steps.map((step, i) => (
                 <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    {step}
                 </li>
               ))}
            </ul>
          </Motion.div>
        ))}
      </div>

      {/* Real-world Feature: Data Harvesting Demo */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 md:p-16 rounded-[3rem] bg-slate-950 border border-slate-800 shadow-3xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-10 transition-opacity">
              <Terminal className="w-64 h-64 text-cyan-500" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest">
                    Live Security Demo
                </div>
                <h3 className="text-4xl font-black text-white leading-tight">
                   Real-time <br /> Credential Harvesting
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                    Modern phishing isn't just a static form. Attackers use "Live Exfiltration" to capture every keystroke you type before you even hit 'Login'. This is why even just typing your password on a fake site is dangerous.
                </p>
                
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-4 text-emerald-400 text-sm font-bold italic">
                      <ShieldCheck className="w-5 h-5" /> DEFENSE: Use Password Managers
                    </div>
                    <div className="flex items-center gap-4 text-emerald-400 text-sm font-bold italic">
                      <ShieldCheck className="w-5 h-5" /> DEFENSE: Always Inspect the FQDN
                    </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-inner">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Simulated Phishing Entry</label>
                    <div className="relative">
                      <input 
                          type={showDemo ? "text" : "password"}
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                          placeholder="Type a test password..."
                          className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-mono"
                      />
                      <button 
                          onClick={() => setShowDemo(!showDemo)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-2"
                      >
                          {showDemo ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                </div>

                <div className="bg-rose-500/[0.03] border border-rose-500/20 p-8 rounded-[2rem] space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 animate-pulse" /> Attacker Remote View
                      </span>
                      <div className="flex items-center gap-2">
                         <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">Encryption: NONE</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                      </div>
                    </div>
                    <div className="font-mono text-3xl break-all min-h-[60px] text-rose-500/90 tracking-tighter overflow-hidden">
                      {demoInput || <span className="text-slate-800/50">••••••••</span>}
                    </div>
                    <p className="text-[10px] text-slate-600 italic leading-relaxed">
                      * WARNING: In a real attack, these characters are transmitted to the attacker's server in cleartext via WebSockets the moment they are typed.
                    </p>
                </div>
              </div>
          </div>
        </div>
      </section>
    </Motion.div>
  );
}
