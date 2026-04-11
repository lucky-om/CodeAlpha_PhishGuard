/* coded by lucky */
import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Landmark, ShieldAlert, Key, Phone, ArrowRight, CheckCircle2, AlertTriangle, User, ExternalLink, Info } from 'lucide-react';

export default function OTPSimulator() {
  const [step, setStep] = useState('landing'); // landing, input, captured
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [attackerConsole, setAttackerConsole] = useState([]);

  const addAttackerLog = (msg) => {
    setAttackerConsole(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  };

  /**
   * ACT AS SECURE CODING PERSON:
   * Simulated data theft demonstrating real-time exfiltration patterns.
   */
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Simulated "Real-time Exfiltration"
    if (value) {
      addAttackerLog(`[DATA] Character captured: index[${index}] -> '${value}'`);
    }

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const startSimulation = () => {
    setStep('input');
    addAttackerLog("[SYSTEM] Phishing payload 'SecureBank_Auth' deployed.");
    addAttackerLog("[SYSTEM] Waiting for victim interaction...");
  };

  const finalizeTheft = () => {
    setStep('captured');
    addAttackerLog("[VICTIM] OTP Submission detected.");
    addAttackerLog(`[CRITICAL] OTP '${otp.join('')}' AUTHORIZED.`);
    addAttackerLog("[SYSTEM] Instant transfer of $2,490.00 to offshore account initiated.");
    addAttackerLog("[SYSTEM] Session terminated. Cookies cleared.");
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Victim's Perspective (The Trap) */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-3xl overflow-hidden min-h-[550px] flex flex-col">
          <div className="bg-emerald-600 p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="p-2 bg-white/10 rounded-lg">
                  <Landmark className="w-6 h-6" />
               </div>
               <span className="font-extrabold tracking-tighter text-lg uppercase italic">PrimeGlobal Trust</span>
            </div>
            <div className="text-[9px] uppercase font-black bg-white/20 px-3 py-1 rounded-full tracking-widest">SECURE_SSL</div>
          </div>

          <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
            {step === 'landing' ? (
              <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-rose-500/20">
                   <ShieldAlert className="w-10 h-10 text-rose-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Action Required</h4>
                  <p className="text-sm text-slate-500 max-w-xs font-medium leading-relaxed">
                    Unusual login detected from Paris, FR. To protect your funds, we have temporarily restricted your account.
                  </p>
                </div>
                <button 
                   onClick={startSimulation}
                   className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20"
                >
                   Verify Identity Now
                </button>
              </Motion.div>
            ) : step === 'input' ? (
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">2FA Verification</h4>
                  <p className="text-sm text-slate-500 font-medium">
                    A 6-digit verification code has been sent to your primary mobile device.
                  </p>
                </div>
                
                <div className="flex justify-between gap-3 py-4">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={val}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-full h-16 text-center text-2xl font-black bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500 outline-none transition-all dark:text-white shadow-inner"
                    />
                  ))}
                </div>

                <button 
                   disabled={otp.includes('')}
                   onClick={finalizeTheft}
                   className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl disabled:opacity-30"
                >
                   Confirm Transaction
                </button>
              </Motion.div>
            ) : (
              <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                 <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">System Secured</h4>
                    <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                      Your identity has been confirmed. The unauthorized session has been terminated and your funds are protected.
                    </p>
                 </div>
                 <div className="p-5 bg-slate-100 dark:bg-slate-900 rounded-2xl text-[10px] flex items-center gap-4 border border-slate-200 dark:border-slate-800">
                    <Info className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-500 italic font-bold">EDUCATIONAL ALERT: In a real attack, your funds would now be exfiltrated. Never enter OTPs on non-official websites.</span>
                 </div>
              </Motion.div>
            )}
          </div>
        </div>

        {/* Attacker's Perspective (Behind the Scenes) */}
        <div className="flex flex-col space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-slate-950 border border-slate-800 shadow-3xl flex-1 flex flex-col font-mono text-[10px] overflow-hidden group">
             <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-900">
                <div className="flex items-center gap-3">
                   <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                   <span className="text-slate-500 uppercase tracking-[0.2em] font-black">C&C REMOTE CONSOLE</span>
                </div>
                <div className="flex gap-2">
                   <div className="px-3 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[8px] font-black tracking-widest">INGRESS_ACTIVE</div>
                </div>
             </div>
             
             <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                {attackerConsole.length === 0 && <p className="text-slate-800 italic">INITIALIZING LISTENER ON PORT 4444...</p>}
                {attackerConsole.map((log, i) => (
                  <Motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-4 border-l border-slate-900 pl-4">
                     <span className="text-slate-700 shrink-0">{log.time}</span>
                     <span className={`leading-relaxed ${log.msg.includes('[CRITICAL]') ? 'text-rose-500 font-black italic' : log.msg.includes('[DATA]') ? 'text-cyan-500 font-bold' : 'text-slate-500'}`}>
                        {log.msg}
                     </span>
                  </Motion.div>
                ))}
             </div>
             <div className="mt-6 pt-4 border-t border-slate-900">
                <p className="text-[8px] text-slate-800 font-black tracking-widest text-right uppercase">Lucky Forensic Lab // Module 06</p>
             </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Key className="w-24 h-24 text-slate-500" />
             </div>
             <h4 className="text-xl font-black mb-6 uppercase tracking-tighter text-slate-900 dark:text-white italic underline decoration-rose-500/50 underline-offset-8">Forensic Breakdown</h4>
             <ul className="space-y-6 text-xs text-slate-500 font-medium">
                <li className="flex gap-4">
                   <div className="w-2 h-2 rounded-full bg-rose-600 mt-1 shrink-0 shadow-[0_0_10px_rgba(225,29,72,0.5)]"></div>
                   <p className="leading-relaxed"><strong className="text-slate-900 dark:text-white uppercase italic">Induced Panic:</strong> By simulating a breach (Paris login), the attacker bypasses your logical defense, making you move faster and check less.</p>
                </li>
                <li className="flex gap-4">
                   <div className="w-2 h-2 rounded-full bg-rose-600 mt-1 shrink-0 shadow-[0_0_10px_rgba(225,29,72,0.5)]"></div>
                   <p className="leading-relaxed"><strong className="text-slate-900 dark:text-white uppercase italic">Zero-Delay Exfil:</strong> Notice the console log capturing every digit. Attackers steal the OTP as you type it, allowing them to bypass 2FA in real-time.</p>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
