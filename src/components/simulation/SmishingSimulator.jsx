/* coded by lucky */
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldAlert, CheckCircle2, ArrowLeft, Send, Zap, X } from 'lucide-react';

const smishScenarios = [
  {
    id: 1,
    sender: '+1 (833) 245-0912',
    message: 'USPS: Your package has a non-delivery status due to an incomplete address. Please update here: https://usps-address-confirm.com/verify',
    type: 'Package Scam',
    redFlags: ['Suspicious URL', 'Sense of Urgency', 'Unknown Number'],
    isPhish: true,
    hotspots: [
      {
        id: 'smish-1-sender',
        label: '1',
        color: 'rose',
        title: 'Unknown Number as Sender',
        tactic: 'Identity Spoofing',
        description: 'USPS and all official government agencies send delivery alerts from verified short-codes (e.g., "USPS") — never from a random +1 phone number. This is a first-look red flag.',
      },
      {
        id: 'smish-1-urgency',
        label: '2',
        color: 'amber',
        title: 'Urgency Trigger',
        tactic: 'Psychological Pressure',
        description: '"Non-delivery status" creates immediate fear of losing your package. This panic shortens your decision-making window so you tap impulsively without inspecting the URL.',
      },
      {
        id: 'smish-1-url',
        label: '3',
        color: 'rose',
        title: 'Malicious URL',
        tactic: 'Domain Impersonation',
        description: '"usps-address-confirm.com" is NOT usps.com. Legitimate USPS links always use usps.com or informeddelivery.usps.com. A hyphenated unofficial domain is a definitive phishing signal.',
      },
    ],
  },
  {
    id: 2,
    sender: 'Apple',
    message: 'Your Apple ID was used to sign in to a new device. If this was not you, reset your password now at: https://appleid.apple.com',
    type: 'Legitimate Alert',
    redFlags: [],
    isPhish: false,
    hotspots: [
      {
        id: 'smish-2-sender',
        label: '1',
        color: 'emerald',
        title: 'Verified Brand Sender',
        tactic: 'Legitimate Signal ✓',
        description: 'The sender shows "Apple" (a registered short-code), not a phone number. Apple registers official alphanumeric sender IDs with carriers globally. This matches expected legitimate behavior.',
      },
      {
        id: 'smish-2-url',
        label: '2',
        color: 'emerald',
        title: 'Official Domain',
        tactic: 'Legitimate Signal ✓',
        description: '"appleid.apple.com" is Apple\'s genuine identity portal — a subdomain of apple.com. The domain is owned and operates under Apple\'s infrastructure. No impersonation detected.',
      },
      {
        id: 'smish-2-tone',
        label: '3',
        color: 'emerald',
        title: 'Calm, Non-Coercive Tone',
        tactic: 'Legitimate Signal ✓',
        description: 'Notice the phrasing "If this was not you" — it gives you a choice rather than forcing panic. Phishing messages use "Your account WILL be blocked" to override rational thinking.',
      },
    ],
  },
  {
    id: 3,
    sender: '542-01',
    message: 'BANK ALERT: Suspicious activity detected on your account. To prevent block, verify identity: http://secure.bit.ly/bank-auth-7721',
    type: 'Bank Phish',
    redFlags: ['Insecure Link (HTTP)', 'URL Shortener (bit.ly)', 'High Pressure Language'],
    isPhish: true,
    hotspots: [
      {
        id: 'smish-3-sender',
        label: '1',
        color: 'amber',
        title: 'Suspicious Short-Code',
        tactic: 'Spoofed Sender ID',
        description: '"542-01" is a numeric code that appears to mimic a bank short-code, but major banks always use branded alphanumeric IDs like "HDFC" or "CITI". Numeric IDs are a spoofing red flag.',
      },
      {
        id: 'smish-3-http',
        label: '2',
        color: 'rose',
        title: 'Insecure HTTP Protocol',
        tactic: 'No Encryption',
        description: 'The link starts with "http://" not "https://". Any banking or authentication page that doesn\'t use HTTPS is either fake or dangerously insecure. Never enter credentials over HTTP.',
      },
      {
        id: 'smish-3-url',
        label: '3',
        color: 'rose',
        title: 'URL Shortener Disguise',
        tactic: 'Destination Obfuscation',
        description: '"bit.ly" hides the real destination. Attackers use URL shorteners so the phishing domain is never visible before you tap it. PhishGuard always flags URL shorteners as critical threats.',
      },
    ],
  },
];

const colorMap = {
  rose:    { beacon: 'bg-rose-600 shadow-rose-500/50',    ring: 'border-rose-500',  bg: 'bg-rose-500/10',   text: 'text-rose-600 dark:text-rose-400',   badge: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
  amber:   { beacon: 'bg-amber-500 shadow-amber-500/50',  ring: 'border-amber-500', bg: 'bg-amber-500/10',  text: 'text-amber-600 dark:text-amber-400',  badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  emerald: { beacon: 'bg-emerald-600 shadow-emerald-500/50', ring: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
};

export default function SmishingSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const scenario = smishScenarios[currentIndex];

  const handleChoice = (isPhish) => {
    setUserChoice(isPhish);
    setShowResult(true);
    setActiveHotspot(null);
  };

  const nextScenario = () => {
    setCurrentIndex((prev) => (prev + 1) % smishScenarios.length);
    setShowResult(false);
    setUserChoice(null);
    setActiveHotspot(null);
  };

  const toggleHotspot = (spot) => {
    setActiveHotspot((prev) => (prev?.id === spot.id ? null : spot));
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── Phone Mockup ── */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-[300px] h-[600px] bg-slate-950 rounded-[3.5rem] border-[10px] border-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-3xl z-30" />

            <div className="h-full bg-slate-50 dark:bg-neutral-950 rounded-[2.8rem] overflow-hidden flex flex-col relative">
              {/* SMS Header */}
              <div className="p-5 pt-9 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-slate-900 dark:text-white tracking-tight">{scenario.sender}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Text Message</div>
                </div>
              </div>

              {/* SMS Body */}
              <div className="flex-1 p-5 space-y-6 overflow-y-auto pt-8">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-[0.3em]">Today</span>
                </div>
                <Motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none max-w-[92%] shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-[12px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {scenario.message}
                  </p>
                </Motion.div>

                {/* ── Beacon Buttons inside phone ── */}
                <div className="flex gap-3 flex-wrap px-1">
                  {scenario.hotspots.map((spot) => {
                    const c = colorMap[spot.color];
                    const isActive = activeHotspot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => toggleHotspot(spot)}
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white ${c.beacon} shadow-lg text-white text-xs font-black transition-all duration-200 ${isActive ? 'scale-110 ring-2 ring-offset-1 ring-white' : 'hover:scale-110'}`}
                        title={spot.title}
                      >
                        {spot.label}
                        {!isActive && (
                          <span className={`absolute inset-0 rounded-full ${c.beacon} animate-ping opacity-40`} />
                        )}
                      </button>
                    );
                  })}
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest self-center">
                    {activeHotspot ? 'Click beacon to close' : 'Tap beacons to investigate'}
                  </span>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-4 bg-white dark:bg-slate-900 flex gap-3 items-center">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2.5 text-[10px] text-slate-500 font-bold">
                  iMessage
                </div>
                <div className="p-2.5 bg-cyan-600 rounded-2xl text-white shadow-lg">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Hotspot Info Panel (below phone) ── */}
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <Motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={`w-full max-w-[340px] rounded-3xl border-2 shadow-2xl overflow-hidden ${colorMap[activeHotspot.color].ring}`}
              >
                <div className={`px-6 py-4 flex items-start justify-between gap-4 ${colorMap[activeHotspot.color].bg}`}>
                  <div className="space-y-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.25em] ${colorMap[activeHotspot.color].text}`}>
                      {activeHotspot.tactic}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      {activeHotspot.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors mt-0.5"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-950 px-6 py-5">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {activeHotspot.description}
                  </p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Controller / Classify Panel ── */}
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-black tracking-widest uppercase">
              Threat Vector: Smishing
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter">
              Smishing <span className="text-cyan-500 underline decoration-cyan-500/30">Lab</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">
              SMS phishing (Smishing) is surging as mobile users are far less likely to inspect a URL before tapping it. Tap the numbered beacons below the message to reveal forensic intel on each suspicious signal.
            </p>
          </div>

          {/* All hotspots listed as cards for clarity */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Forensic Signals in this message:</p>
            {scenario.hotspots.map((spot) => {
              const c = colorMap[spot.color];
              const isActive = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => toggleHotspot(spot)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group ${isActive ? `${c.bg} ${c.ring}` : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full ${c.beacon} text-white text-[11px] font-black flex items-center justify-center shadow-lg`}>
                    {spot.label}
                  </span>
                  <div className="space-y-1 min-w-0">
                    <div className={`text-[9px] font-black uppercase tracking-widest ${c.text}`}>{spot.tactic}</div>
                    <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">{spot.title}</div>
                    {isActive && (
                      <Motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-2"
                      >
                        {spot.description}
                      </Motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <Motion.div key="choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Classify this message:</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleChoice(false)}
                    className="p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group"
                  >
                    <CheckCircle2 className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 mb-2 transition-colors" />
                    <span className="block font-black uppercase text-xs tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">Legitimate</span>
                  </button>
                  <button
                    onClick={() => handleChoice(true)}
                    className="p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:bg-rose-500/5 transition-all group"
                  >
                    <ShieldAlert className="w-8 h-8 text-slate-300 group-hover:text-rose-500 mb-2 transition-colors" />
                    <span className="block font-black uppercase text-xs tracking-widest text-slate-400 group-hover:text-rose-500 transition-colors">Flag as Phish</span>
                  </button>
                </div>
              </Motion.div>
            ) : (
              <Motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-3xl border-2 shadow-xl ${userChoice === scenario.isPhish ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${userChoice === scenario.isPhish ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {userChoice === scenario.isPhish ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <h4 className="font-black text-lg uppercase italic tracking-tighter">
                    {userChoice === scenario.isPhish ? 'Correct Classification' : 'Misclassification'}
                  </h4>
                </div>
                <p className={`text-sm font-bold mb-5 pb-5 border-b ${userChoice === scenario.isPhish ? 'text-emerald-700 dark:text-emerald-400 border-emerald-500/20' : 'text-rose-700 dark:text-rose-400 border-rose-500/20'}`}>
                  Classification: <strong>{scenario.isPhish ? 'MALICIOUS (Smishing)' : 'LEGITIMATE SYSTEM ALERT'}</strong>
                </p>
                {scenario.isPhish && (
                  <div className="space-y-3 mb-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Confirmed Red-Flags:</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.redFlags.map((flag) => (
                        <span key={flag} className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black border border-rose-500/20 uppercase tracking-widest">{flag}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={nextScenario}
                  className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[11px] tracking-widest uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
                >
                  Next Scenario <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Lucky Forensic Lab // Smishing Module</p>
          </div>
        </div>
      </div>
    </div>
  );
}
