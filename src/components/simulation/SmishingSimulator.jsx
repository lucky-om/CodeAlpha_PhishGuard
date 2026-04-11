/* coded by lucky */
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldAlert, CheckCircle2, Info, ArrowLeft, Send, Zap } from 'lucide-react';

const smishScenarios = [
  {
    id: 1,
    sender: '+1 (833) 245-0912',
    message: 'USPS: Your package has a non-delivery status due to an incomplete address. Please update here: https://usps-address-confirm.com/verify',
    type: 'Package Scam',
    redFlags: ['Suspicious URL', 'Sense of Urgency', 'Generic Greeting'],
    isPhish: true
  },
  {
    id: 2,
    sender: 'Apple',
    message: 'Your Apple ID was used to sign in to a new device. If this was not you, reset your password now at: https://appleid.apple.com',
    type: 'Security Alert',
    redFlags: [],
    isPhish: false
  },
  {
    id: 3,
    sender: '542-01',
    message: 'BANK ALERT: Suspicious activity detected on your account. To prevent block, verify identity: http://secure.bit.ly/bank-auth-7721',
    type: 'Bank Phish',
    redFlags: ['Insecure Link (HTTP)', 'Shortened URL (bit.ly)', 'High Pressure'],
    isPhish: true
  }
];

export default function SmishingSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

  const scenario = smishScenarios[currentIndex];

  /**
   * ACT AS SECURE CODING PERSON:
   * Scenario handling is deterministic and client-side to prevent server-side injection or tracking.
   */
  const handleChoice = (isPhish) => {
    setUserChoice(isPhish);
    setShowResult(true);
  };

  const nextScenario = () => {
    setCurrentIndex((prev) => (prev + 1) % smishScenarios.length);
    setShowResult(false);
    setUserChoice(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Phone Mockup - PREMIUM */}
      <div className="flex justify-center">
        <div className="relative w-[320px] h-[640px] bg-slate-950 rounded-[3.5rem] border-[12px] border-slate-900 shadow-3xl p-4 overflow-hidden group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-30"></div>
          
          {/* Screen Content */}
          <div className="h-full bg-slate-50 dark:bg-black rounded-[2.5rem] overflow-hidden flex flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
            
            <div className="p-6 pt-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-inner">
                  <MessageSquare className="w-6 h-6 text-cyan-500" />
               </div>
               <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">{scenario.sender}</div>
                  <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Encrypted Session</div>
               </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
               <div className="flex flex-col items-center py-2">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-[0.3em]">Timeline: Today</span>
               </div>
               
               <Motion.div 
                  key={scenario.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-800/80 p-5 rounded-[2rem] rounded-tl-none max-w-[90%] shadow-xl border border-slate-200 dark:border-slate-700 relative"
               >
                  <p className="text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
                     {scenario.message}
                  </p>
               </Motion.div>
            </div>

            {/* Bottom Input Area */}
            <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex gap-3 items-center relative z-10">
               <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 py-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Secure Reply...
               </div>
               <div className="p-3 bg-cyan-600 rounded-2xl text-white shadow-lg shadow-cyan-600/20">
                  <Send className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controller / Analysis */}
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-black tracking-widest uppercase">
            Threat Vector: Smishing
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter">
             Smishing Lab <span className="text-cyan-500 underline decoration-cyan-500/30">Analytics</span>
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
             Text message phishing (Smishing) is rising. Attackers use familiar brand names to trick you into tapping a link on your mobile device where you are less likely to inspect the URL.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <Motion.div 
               key="choice"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="space-y-6"
            >
               <p className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Forensic Assessment Req:</p>
               <div className="grid grid-cols-2 gap-6">
                  <button 
                     onClick={() => handleChoice(false)}
                     className="p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group overflow-hidden relative"
                  >
                     <CheckCircle2 className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 mb-2 transition-colors" />
                     <span className="block font-black uppercase text-xs tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">Safe Link</span>
                  </button>
                  <button 
                     onClick={() => handleChoice(true)}
                     className="p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:bg-rose-500/5 transition-all group overflow-hidden relative"
                  >
                     <ShieldAlert className="w-8 h-8 text-slate-300 group-hover:text-rose-500 mb-2 transition-colors" />
                     <span className="block font-black uppercase text-xs tracking-widest text-slate-400 group-hover:text-rose-500 transition-colors">Forensic Flag</span>
                  </button>
               </div>
            </Motion.div>
          ) : (
            <Motion.div 
               key="result"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`p-10 rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden ${
                 userChoice === scenario.isPhish 
                 ? 'bg-emerald-500/5 border-emerald-500/30' 
                 : 'bg-rose-500/5 border-rose-500/30'
               }`}
            >
               <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                  <Zap className={`w-32 h-32 ${userChoice === scenario.isPhish ? 'text-emerald-500' : 'text-rose-500'}`} />
               </div>

               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className={`p-2 rounded-xl ${userChoice === scenario.isPhish ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {userChoice === scenario.isPhish 
                      ? <CheckCircle2 className="w-6 h-6" /> 
                      : <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <h4 className="font-black text-xl uppercase italic tracking-tighter">
                    {userChoice === scenario.isPhish ? 'Analysis Correct' : 'Analysis Failed'}
                  </h4>
               </div>
               
               <p className={`mb-8 font-bold italic border-b-2 pb-6 relative z-10 ${userChoice === scenario.isPhish ? 'text-emerald-700 dark:text-emerald-400 border-emerald-500/10' : 'text-rose-700 dark:text-rose-400 border-rose-500/10'}`}>
                 SYSTEM CLASSIFICATION: <strong>{scenario.isPhish ? 'MALICIOUS_Smish' : 'LEGITIMATE_SYSTEM_ALERT'}</strong>
               </p>

               {scenario.isPhish && (
                 <div className="space-y-4 relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Forensic Red-Flags:</p>
                   <div className="flex flex-wrap gap-2">
                     {scenario.redFlags.map(flag => (
                       <span key={flag} className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black border border-rose-500/20 uppercase tracking-widest">
                          {flag}
                       </span>
                     ))}
                   </div>
                 </div>
               )}

               <button 
                  onClick={nextScenario}
                  className="mt-10 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[11px] tracking-widest uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
               >
                  Load Next Vector <ArrowLeft className="w-4 h-4 rotate-180" />
               </button>
            </Motion.div>
          )}
        </AnimatePresence>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Lucky Forensic Lab // Module 03</p>
        </div>
      </div>
    </div>
  );
}
