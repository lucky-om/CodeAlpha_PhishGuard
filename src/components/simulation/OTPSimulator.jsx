// CODED BY LUCKY
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Landmark, ShieldAlert, Key, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const landingHotspots = [
  {
    id: 'otp-brand',
    label: '1',
    color: 'rose',
    title: 'Cloned Brand Identity',
    tactic: 'Visual Spoofing',
    description: '"PrimeGlobal Trust" uses a professional green header and banking iconography to visually mimic real bank portals. Attackers invest heavily in pixel-perfect clones — judge by the URL bar, not the design.',
  },
  {
    id: 'otp-ssl',
    label: '2',
    color: 'amber',
    title: 'Fake "SECURE_SSL" Badge',
    tactic: 'False Trust Signal',
    description: 'The "SECURE_SSL" badge is pure HTML text — it means nothing. Any attacker can paste this label anywhere. Only the green padlock in your browser\'s URL bar confirms a genuine SSL certificate.',
  },
  {
    id: 'otp-alert',
    label: '3',
    color: 'rose',
    title: 'Fabricated Threat (Paris Login)',
    tactic: 'Induced Panic',
    description: 'By claiming a login from Paris, the attacker triggers your fight-or-flight instinct. This panic deliberately short-circuits rational thinking, making you rush through the page without inspecting it.',
  },
];

const inputHotspots = [
  {
    id: 'otp-2fa-header',
    label: '1',
    color: 'rose',
    title: 'Fake 2FA Page',
    tactic: 'MFA Interception',
    description: 'This "2FA Verification" page is a Man-in-the-Middle relay. The attacker simultaneously logs into the real bank using your credentials, triggers a genuine OTP, then harvests it here as you type it.',
  },
  {
    id: 'otp-digits',
    label: '2',
    color: 'rose',
    title: 'Real-Time Keystroke Capture',
    tactic: 'Zero-Delay Exfiltration',
    description: 'Each digit you type is sent to the attacker\'s C2 server in real-time via WebSocket. They complete their bank login within seconds of you submitting — faster than any standard OTP expiry window.',
  },
];

const colorMap = {
  rose: { dot: 'bg-rose-600 shadow-rose-500/60', ring: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-500' },
  amber: { dot: 'bg-amber-500 shadow-amber-400/60', ring: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-500' },
};

export default function OTPSimulator() {
  const [step, setStep] = useState('landing');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [attackerConsole, setAttackerConsole] = useState([]);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const addAttackerLog = (msg) => {
    setAttackerConsole(prev => [...prev, { time: new Date().toLocaleTimeString([], { hour12: false }), msg }]);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Each keystroke simulates real-time exfiltration to the attacker console
    if (value) {
      addAttackerLog(`[DATA] Keystroke captured: index[${index}] -> '${value}'`);
    }

    // Auto-advance focus to the next OTP input field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const startSimulation = () => {
    setStep('input');
    setActiveHotspot(null);
    addAttackerLog("[SYSTEM] Phishing payload 'SecureBank_Auth' deployed.");
    addAttackerLog("[SYSTEM] Relay to real bank: login accepted. Awaiting OTP...");
  };

  const finalizeTheft = () => {
    setStep('captured');
    setActiveHotspot(null);
    addAttackerLog("[VICTIM] OTP submission detected.");
    addAttackerLog(`[CRITICAL] OTP '${otp.join('')}' captured — bank session authorized.`);
    addAttackerLog("[SYSTEM] Transfer of ₹2,49,000 to offshore account initiated.");
    addAttackerLog("[SYSTEM] Session terminated. Evidence cleared.");
  };

  const resetSim = () => {
    setStep('landing');
    setOtp(['', '', '', '', '', '']);
    setAttackerConsole([]);
    setActiveHotspot(null);
  };

  const toggleHotspot = (spot) => setActiveHotspot(prev => prev?.id === spot.id ? null : spot);
  const currentHotspots = step === 'landing' ? landingHotspots : step === 'input' ? inputHotspots : [];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* ── Left: Victim's view — the phishing page ── */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-950 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[460px] flex flex-col">

            {/* Cloned bank header — green color chosen to mimic real banking trust signals */}
            <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg"><Landmark className="w-5 h-5" /></div>
                <span className="font-extrabold tracking-tighter text-lg uppercase italic">PrimeGlobal Trust</span>
              </div>
              {/* Fake SSL badge — entirely decorative text, has no cryptographic meaning */}
              <div className="text-[9px] uppercase font-black bg-white/20 px-3 py-1 rounded-full tracking-widest">SECURE_SSL</div>
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative">

              {step === 'landing' && (
                <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 w-full">
                  <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-rose-500/20">
                    <ShieldAlert className="w-8 h-8 text-rose-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Action Required</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
                      Unusual login detected from <strong>Paris, France</strong>. Your account has been temporarily restricted.
                    </p>
                  </div>
                  <button onClick={startSimulation}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20">
                    Verify Identity Now
                  </button>
                </Motion.div>
              )}

              {step === 'input' && (
                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">2FA Verification</h4>
                    <p className="text-sm text-slate-500 font-medium">A 6-digit code has been sent to your mobile device.</p>
                  </div>
                  {/* Each input auto-focuses the next field as digits are entered */}
                  <div className="flex justify-between gap-2 py-4">
                    {otp.map((val, i) => (
                      <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength="1" value={val}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-full h-14 text-center text-2xl font-black bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl focus:border-emerald-500 outline-none transition-all dark:text-white" />
                    ))}
                  </div>
                  <button disabled={otp.includes('')} onClick={finalizeTheft}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl disabled:opacity-30">
                    Confirm Transaction
                  </button>
                </Motion.div>
              )}

              {step === 'captured' && (
                <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Account Secured</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">The unauthorized session has been terminated and your funds are protected.</p>
                  </div>
                  {/* Educational callout — shown after the simulated theft to drive the lesson home */}
                  <div className="p-5 bg-rose-500/5 rounded-2xl text-xs flex items-start gap-3 border border-rose-500/20 text-left">
                    <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-rose-600 dark:text-rose-400 italic font-bold">
                      EDUCATIONAL ALERT: In a real attack, your funds were just exfiltrated. Check the attacker's console to see exactly what happened.
                    </span>
                  </div>
                  <button onClick={resetSim} className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                    Restart Simulation
                  </button>
                </Motion.div>
              )}
            </div>
          </div>

          {/* Hotspot beacon list — only shown during 'landing' and 'input' steps */}
          {currentHotspots.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Forensic beacons for this step — click to reveal:
              </p>
              {currentHotspots.map((spot) => {
                const c = colorMap[spot.color];
                const isActive = activeHotspot?.id === spot.id;
                return (
                  <button key={spot.id} onClick={() => toggleHotspot(spot)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${isActive ? `${c.bg} ${c.ring}` : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                    <span className={`shrink-0 w-7 h-7 rounded-full ${c.dot} text-white text-[11px] font-black flex items-center justify-center shadow-lg`}>
                      {spot.label}
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <div className={`text-[9px] font-black uppercase tracking-widest ${c.text}`}>{spot.tactic}</div>
                      <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">{spot.title}</div>
                      {isActive && (
                        <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-2">
                          {spot.description}
                        </Motion.p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Right: Attacker's perspective ── */}
        <div className="flex flex-col space-y-6">

          {/* Active hotspot detail card — shown above the console when a beacon is selected */}
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <Motion.div key={activeHotspot.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className={`rounded-3xl border-2 overflow-hidden shadow-2xl ${colorMap[activeHotspot.color].ring}`}>
                <div className={`px-6 py-5 flex items-start justify-between gap-4 ${colorMap[activeHotspot.color].bg}`}>
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.25em] ${colorMap[activeHotspot.color].text}`}>{activeHotspot.tactic}</span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1 leading-tight">{activeHotspot.title}</h4>
                  </div>
                  <button onClick={() => setActiveHotspot(null)} className="p-1 rounded-lg hover:bg-black/10 shrink-0">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-950 px-6 py-5">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{activeHotspot.description}</p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Attacker C2 console — logs update live as the victim interacts */}
          <div className="flex-1 p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col font-mono text-[10px] min-h-[280px]">
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-900">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="text-slate-500 uppercase tracking-[0.2em] font-black">C2 Attacker Console</span>
              </div>
              <div className="px-3 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[8px] font-black tracking-widest">INGRESS_ACTIVE</div>
            </div>
            <div className="flex-1 space-y-2.5 overflow-y-auto custom-scrollbar">
              {attackerConsole.length === 0 && <p className="text-slate-800 italic">INITIALIZING LISTENER // AWAITING VICTIM...</p>}
              {attackerConsole.map((log, i) => (
                <Motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-3 border-l border-slate-900 pl-3">
                  <span className="text-slate-700 shrink-0">{log.time}</span>
                  <span className={`leading-relaxed ${log.msg.includes('[CRITICAL]') ? 'text-rose-500 font-black italic' :
                      log.msg.includes('[DATA]') ? 'text-cyan-400 font-bold' :
                        'text-slate-500'
                    }`}>
                    {log.msg}
                  </span>
                </Motion.div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900">
              <p className="text-[8px] text-slate-800 font-black tracking-widest text-right uppercase">Lucky Forensic Lab // OTP Intercept Module</p>
            </div>
          </div>

          {/* Static attack chain breakdown — always visible to reinforce learning */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Key className="w-24 h-24 text-slate-500" />
            </div>
            <h4 className="text-xl font-black mb-5 uppercase tracking-tighter text-slate-900 dark:text-white italic underline decoration-rose-500/50 underline-offset-8">Attack Chain Breakdown</h4>
            <ul className="space-y-5 text-sm">
              {[
                { title: 'Induced Panic', body: '"Paris, France" login fabricates a believable threat. Your emotional override bypasses rational URL inspection.' },
                { title: 'MFA Relay Attack', body: 'Attacker logs into the real bank with your stolen password instantly, then re-serves an authentic OTP to you to intercept.' },
                { title: 'Zero-Delay Exfil', body: 'Every digit you type is forwarded to the attacker in milliseconds — well within the standard OTP expiry window of 30–60 seconds.' },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-rose-600 mt-2 shrink-0 shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white uppercase italic">{item.title}: </strong>{item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
