/* coded by lucky */
import { motion as Motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Terminal, CheckCircle2, Layout, Zap, ArrowRight, ShieldCheck, Shield } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Phish Anatomy',
      desc: 'Investigate high-fidelity web & email deconstructions. Identify hidden red-flags used by threat actors.',
      path: '/simulation',
      icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
      color: 'rose'
    },
    {
      title: 'AI Link Analyzer',
      desc: 'Let our autonomous security agent safely audit suspicious domains in a virtualized sandbox.',
      path: '/analyzer',
      icon: <Terminal className="w-8 h-8 text-cyan-500" />,
      color: 'cyan'
    },
    {
      title: 'Security IQ Quiz',
      desc: 'Challenge your detection skills with randomized attack scenarios and get your security rating.',
      path: '/quiz',
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative text-center overflow-hidden py-24 px-6 rounded-[3rem] bg-slate-950 border border-slate-800 shadow-3xl group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-cyan-500)_0%,_transparent_75%)] opacity-[0.03] animate-pulse"></div>
        
        <Motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="relative z-10 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-cyan-950/50 border border-cyan-500/20 text-cyan-500 text-[10px] font-black tracking-[0.2em] uppercase">
            <Zap className="w-3 h-3" />
            Active Deployment: LUCKY_PHISHGUARD_SECURE
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-tight italic uppercase">
            PhishGuard : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 drop-shadow-2xl">
              Phishing Detection & Prevention
            </span>
          </h1>
          
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Welcome to the PhishGuard Intel Portal. We provide state-of-the-art forensic tools to analyze, detect, and neutralize advanced social engineering threats. Developed by Lucky.
          </p>
          <div className="pt-8 flex flex-wrap justify-center gap-6">
            <NavLink to="/analyzer" className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-cyan-500/30 transition-all flex items-center gap-3 group">
              Start Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </NavLink>
            <NavLink to="/prevention" className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest border-2 border-slate-800 transition-all flex items-center gap-3">
              <Shield className="w-5 h-5" />
              Prevention
            </NavLink>
          </div>
        </Motion.div>

        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-cyan-500/20"></div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {features.map((feature, idx) => (
          <Motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-cyan-500/5 transition-all hover:border-cyan-500/40 relative overflow-hidden"
          >
            <div className={`w-20 h-20 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner`}>
              {feature.icon}
            </div>
            <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors uppercase tracking-tighter italic">
              {feature.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-medium">
              {feature.desc}
            </p>
            <NavLink to={feature.path} className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 hover:gap-5 transition-all">
              Launch Module <ArrowRight className="w-4 h-4" />
            </NavLink>
          </Motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="p-16 rounded-[3rem] bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-around gap-12 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 blur-[100px]"></div>
        <div className="space-y-2 relative z-10">
          <div className="text-5xl font-black text-emerald-500 italic">10k+</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Threats Audited</div>
        </div>
        <div className="w-[1px] h-16 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
        <div className="space-y-2 relative z-10">
          <div className="text-5xl font-black text-cyan-500 italic">ZERO</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Data Leakage</div>
        </div>
        <div className="w-[1px] h-16 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
        <div className="space-y-2 relative z-10">
          <div className="text-5xl font-black text-rose-500 italic">100%</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Secure Sandbox</div>
        </div>
      </section>
    </div>
  );
}
