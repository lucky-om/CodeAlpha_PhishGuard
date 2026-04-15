// Coded by Lucky

import { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Terminal, CheckCircle2, ArrowRight, ShieldCheck, Shield, Zap, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';


const DAILY_THREATS = [
  {
    title: 'QR Code Quishing',
    type: 'Quishing',
    badge: 'Trending',
    badgeColor: 'rose',
    summary: 'Attackers are replacing legitimate QR codes in public spaces (restaurants, parking meters, banks) with malicious ones that redirect to credential harvesting sites.',
    tip: 'Always type the URL manually or use a QR scanner that shows you the destination before opening.',
  },
  {
    title: 'Adversary-in-the-Middle (AiTM)',
    type: 'MFA Bypass',
    badge: 'Critical',
    badgeColor: 'rose',
    summary: 'Modern phishing kits intercept MFA codes in real time by sitting between the victim and the real site, rendering SMS-based 2FA obsolete.',
    tip: 'Use hardware security keys (FIDO2/WebAuthn) instead of SMS or TOTP codes for high-value accounts.',
  },
  {
    title: 'Punycode Homograph Attacks',
    type: 'Domain Spoofing',
    badge: 'Emerging',
    badgeColor: 'yellow',
    summary: 'Unicode characters that look identical to Latin letters (e.g., Cyrillic "а" vs. Latin "a") are used to create visually indistinguishable fake domains like аpple.com.',
    tip: 'Enable IDN display in your browser settings to reveal punycode. PhishGuard\'s analyzer detects these automatically.',
  },
  {
    title: 'Brand Impersonation via Free Hosting',
    type: 'Free Hosting Abuse',
    badge: 'Common',
    badgeColor: 'yellow',
    summary: 'Attackers create phishing pages on .github.io, .netlify.app, and .pages.dev — trusted platforms that bypass many email filters and URL blockers.',
    tip: 'Check if a link goes to .github.io, .netlify.app, .vercel.app — then verify if you were expecting to visit that exact URL.',
  },
  {
    title: 'Spear Phishing via LinkedIn',
    type: 'Spear Phishing',
    badge: 'High Volume',
    badgeColor: 'orange',
    summary: 'Attackers harvest professional details from LinkedIn to craft personalized phishing emails impersonating colleagues, HR, or executives (BEC attacks).',
    tip: 'Verify any unexpected requests for wire transfers, data, or credentials via a separate phone call to the sender.',
  },
  {
    title: 'SMS Smishing Surge',
    type: 'Smishing',
    badge: 'Active Alert',
    badgeColor: 'rose',
    summary: 'Package delivery scams (DHL, FedEx, India Post) are surging globally. Victims receive fake "delivery failed" SMS messages with shortened malicious URLs.',
    tip: 'Never click links in SMS messages about deliveries. Go directly to the courier\'s official website and track manually.',
  },
  {
    title: 'Open Redirect Exploitation',
    type: 'Redirect Chaining',
    badge: 'Sophisticated',
    badgeColor: 'yellow',
    summary: 'Attackers exploit legitimate websites with open redirect vulnerabilities to route victims through trusted domains (e.g., google.com/url?q=evil.com) before landing on phishing pages.',
    tip: 'If a URL contains parameters like ?url=, ?redirect=, or ?goto=, always inspect the full destination.',
  },
];


function CountUp({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const steps = Math.max(40, Math.floor(duration / 16));
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}


export default function Home() {
  const todayThreat = DAILY_THREATS[new Date().getDay() % DAILY_THREATS.length];

  const features = [
    {
      title: 'Phish Anatomy',
      desc: 'Review examples of phishing emails and websites. Learn to spot the signs of common scams.',
      path: '/simulation',
      icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
      panelClass: 'bg-rose-500/10',
    },
    {
      title: 'Link Analyzer',
      desc: 'Check suspicious domains to see if they are safe to visit, all running locally in your browser.',
      path: '/analyzer',
      icon: <Terminal className="w-8 h-8 text-cyan-500" />,
      panelClass: 'bg-cyan-500/10',
    },
    {
      title: 'Security IQ Quiz',
      desc: 'Challenge your skills with interactive scenarios across email, SMS, and web domains.',
      path: '/quiz',
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      panelClass: 'bg-emerald-500/10',
    },
  ];

  const badgeColors = {
    rose: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  };

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 py-8 sm:py-12">

      {/* Hero Section */}
      <section className="relative text-center overflow-hidden py-14 sm:py-20 lg:py-24 px-4 sm:px-6 rounded-[2rem] sm:rounded-[3rem] bg-slate-950 border border-slate-800 shadow-2xl group">
        {/* Background removed to drop AI glow */}

        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8"
        >


          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            PhishGuard : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 drop-shadow-2xl">
              Phishing Detection &amp; Prevention
            </span>
          </h1>

          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
            A simple and effective tool to help you detect phishing links. Learn about different attacks, test your skills, and stay safe online.
          </p>

          <div className="pt-6 sm:pt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
            <NavLink to="/analyzer" className="px-6 sm:px-10 py-4 sm:py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-cyan-500/30 transition-all flex items-center gap-2 sm:gap-3 group">
              Start Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </NavLink>
            <NavLink to="/prevention" className="px-6 sm:px-10 py-4 sm:py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-slate-800 transition-all flex items-center gap-2 sm:gap-3">
              <Shield className="w-5 h-5" /> Prevention
            </NavLink>
          </div>
        </Motion.div>

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-cyan-500/20" />
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {features.map((feature, idx) => (
          <Motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="group p-10 rounded-[2.5rem] bg-slate-950 border border-slate-800 shadow-xl hover:shadow-cyan-500/10 transition-all hover:border-cyan-500/40 relative overflow-hidden"
          >
            <div className={`w-20 h-20 rounded-2xl ${feature.panelClass} flex items-center justify-center mb-10 group-hover:scale-105 transition-transform shadow-inner`}>
              {feature.icon}
            </div>
            <h3 className="text-3xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors tracking-tight">
              {feature.title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-10 font-medium">
              {feature.desc}
            </p>
            <NavLink to={feature.path} className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] text-cyan-400 hover:gap-5 transition-all">
              Launch Module <ArrowRight className="w-4 h-4" />
            </NavLink>
          </Motion.div>
        ))}
      </section>

      {/* Daily Threat Briefing (Feature D) */}
      <section className="max-w-7xl mx-auto px-4">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-10 md:p-16 rounded-[3rem] bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative group"
        >


          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500">
                <Calendar className="w-3 h-3" /> Phishing Trends
              </div>
              <h2 className="text-3xl font-black text-white leading-tight italic uppercase tracking-tighter">
                Latest Phishing Trends
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Stay updated with the most common phishing techniques to protect yourself from evolving threats.
              </p>
              <NavLink to="/encyclopedia" className="inline-flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </NavLink>
            </div>

            <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${badgeColors[todayThreat.badgeColor]}`}>
                      {todayThreat.badge}
                    </span>
                    <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">{todayThreat.type}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{todayThreat.title}</h3>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500/50 shrink-0" />
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">{todayThreat.summary}</p>

              <div className="flex gap-3 items-start p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1">Defense Tip</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{todayThreat.tip}</p>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </section>



    </div>
  );
}
