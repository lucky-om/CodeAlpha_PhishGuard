/*  
  This module simulates real phishing vectors with high-fidelity deconstructions.
  Coded by Lucky 
*/
import { useState, useEffect } from 'react';
import { Mail, AlertCircle, ShieldAlert, CheckCircle2, Target, Info, MousePointer2 } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export default function EmailGallery() {
  const { markSectionComplete } = useGame();

  const emails = [
    {
      id: 'microsoft',
      name: 'Microsoft Account',
      sender: 'Microsoft Security <security@rnicrosoft-support.com>',
      subject: 'Action Required: Unusual sign-in activity',
      date: 'Today at 10:42 AM',
      content: (
        <div className="font-sans text-slate-800 dark:text-slate-200">
          <h2 className="text-xl font-bold mb-4">Microsoft account unusual activity</h2>
          <p className="mb-4">We detected something unusual about a recent sign-in to the Microsoft account.</p>
          <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-cyan-500 p-6 rounded-r-2xl mb-6 shadow-inner">
            <p className="font-bold text-slate-900 dark:text-white mb-2">Sign-in details:</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div><span className="text-slate-500 uppercase">Country:</span> Russia</div>
              <div><span className="text-slate-500 uppercase">IP:</span> 192.168.1.1</div>
            </div>
          </div>
          <p className="mb-6 leading-relaxed">Please review your recent activity and we'll help you take corrective action.</p>
          <button className="bg-[#0067b8] text-white px-8 py-3 rounded-md font-bold hover:bg-[#005da6] transition-all shadow-lg active:scale-95">
            Review recent activity
          </button>
        </div>
      ),
      hotspots: [
        { id: 'ms-sender', top: '22%', left: '35%', title: 'Spoofed Sender', tactic: 'Typosquatting', description: 'Look closely at the sender. It says "rnicrosoft" (using "r" and "n") instead of "microsoft".' },
        { id: 'ms-urgency', top: '45%', left: '20%', title: 'Psychological Bait', tactic: 'Urgency', description: 'The email uses "Russia" as a sign-in location to trigger an immediate fear response.' },
        { id: 'ms-btn', top: '82%', left: '15%', title: 'Deceptive Link', tactic: 'Payload Redirect', description: 'This button leads to a cloned portal on "rnicrosoft-resolve.tech" instead of microsoft.com.' }
      ]
    },
    {
      id: 'amazon',
      name: 'Amazon.com',
      sender: 'Amazon Store <orders@amazon-billing-update.info>',
      subject: 'Order Confirmation: #114-1234567',
      date: 'Yesterday at 3:15 PM',
      content: (
        <div className="font-sans text-slate-800 dark:text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <h2 className="text-3xl font-black text-[#ff9900] italic">amazon</h2>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Confirmation</span>
          </div>
          <p className="mb-4 text-lg font-bold">Hello Customer,</p>
          <p className="mb-6">Thank you for shopping with us. Your order #114-1234567-890123 has shipped.</p>
          <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-3xl mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-black text-xl mb-1">PlayStation 5 Pro</p>
                <p className="text-xs font-bold text-orange-600">Total: $699.00</p>
              </div>
              <button className="bg-[#f0c14b] text-[#111] border border-[#a88734] px-6 py-3 rounded-xl font-bold hover:bg-[#f4d078] shadow-md transition-all">
                Cancel Order
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black italic">Protected by Amazon Security Services</p>
        </div>
      ),
      hotspots: [
        { id: 'amz-greet', top: '35%', left: '10%', title: 'Generic Greeting', tactic: 'Mass Phishing', description: '"Hello Customer" is a clear sign. Amazon always uses your first name for billing emails.' },
        { id: 'amz-sender', top: '5%', left: '30%', title: 'Domain Anomaly', tactic: 'Impersonation', description: 'The official domain is amazon.com, but this comes from "amazon-billing-update.info".' },
        { id: 'amz-bait', top: '75%', left: '60%', title: 'Panic Baiting', tactic: 'Social Engineering', description: 'By showing an expensive PS5 you didn\'t buy, they bait you into clicking "Cancel" in a panic.' }
      ]
    },
    {
      id: 'netflix',
      name: 'Netflix Support',
      sender: 'Netflix Billing <billing@netfIix.security>',
      subject: 'Payment Error: Your account is on hold',
      date: 'Monday at 8:00 AM',
      content: (
        <div className="font-sans text-slate-800 dark:text-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-[#E50914] tracking-tighter">NETFLIX</h2>
          </div>
          <p className="text-xl font-bold mb-4">Payment Declined</p>
          <p className="mb-8 leading-relaxed">We're having some trouble with your current billing information. We'll try again, but in the meantime you may want to update your payment method.</p>
          <button className="bg-[#E50914] text-white px-12 py-4 rounded font-bold uppercase tracking-widest shadow-xl hover:bg-[#ff0c18] transition-all">
            Update Payment
          </button>
          <div className="mt-12 text-[10px] text-slate-500 space-y-2">
            <p>Questions? Visit the Help Center</p>
            <p>&copy; 2026 Netflix, Inc.</p>
          </div>
        </div>
      ),
      hotspots: [
        { id: 'nfx-send', top: '5%', left: '26%', title: 'Homograph Attack', tactic: 'Typosquatting', description: 'The sender is "netfIix" with a capital "I" instead of "l". This is a classic visual deception.' },
        { id: 'nfx-pay', top: '70%', left: '30%', title: 'Harvesting Portal', tactic: 'Credential Theft', description: 'This button redirects to a perfect clone of Netflix.com specifically built to steal credit card data.' }
      ]
    }
  ];

  const [activeEmail, setActiveEmail] = useState(emails[0]);
  const [showHotspots, setShowHotspots] = useState(false);
  const [discoveredHotspots, setDiscoveredHotspots] = useState([]);

  useEffect(() => {
    if (discoveredHotspots.length === activeEmail.hotspots.length) {
      markSectionComplete('simulation');
    }
  }, [discoveredHotspots, activeEmail, markSectionComplete]);

  const handleHotspotClick = (id) => {
    if (!discoveredHotspots.includes(id)) {
      setDiscoveredHotspots([...discoveredHotspots, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[850px]">
      {/* Simulation Inbox Interface */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-2xl relative">
        <div className="p-8 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500 italic">Forensic Inbox</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Active Simulation Unit</p>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => {
                setActiveEmail(email);
                setDiscoveredHotspots([]);
                setShowHotspots(false);
              }}
              className={`w-full text-left p-6 rounded-[2rem] transition-all border group relative overflow-hidden ${activeEmail.id === email.id
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-2xl shadow-cyan-500/20 translate-x-1'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02]'
                }`}
            >
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeEmail.id === email.id ? 'text-white' : 'text-cyan-500'}`}>
                    {email.name}
                  </span>
                  <Mail className={`w-3 h-3 ${activeEmail.id === email.id ? 'opacity-50' : 'opacity-20'}`} />
                </div>
                <span className="font-black text-sm leading-tight tracking-tight uppercase italic">{email.subject}</span>
                <span className="text-[10px] opacity-60 font-bold font-mono tracking-tighter">{email.date}</span>
              </div>
              {activeEmail.id === email.id && (
                <Motion.div layoutId="active-bg" className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Forensic Examination Area */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="flex-1 bg-white dark:bg-slate-950 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-3xl relative overflow-hidden flex flex-col group">

          {/* Email Inspection Header */}
          <div className="p-10 border-b border-slate-100 dark:border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-950 shadow-sm relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-cyan-500 text-2xl font-black italic shadow-inner border border-slate-800">
                {activeEmail.name[0]}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">{activeEmail.sender}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol: INSECURE</span>
                  <span className="w-1 h-1 rounded-full bg-rose-500"></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${showHotspots
                  ? 'bg-rose-500 text-white shadow-2xl shadow-rose-500/30 ring-4 ring-rose-500/10'
                  : 'bg-slate-900 text-cyan-500 border border-cyan-500/20 hover:scale-105 active:scale-95'
                }`}
            >
              {showHotspots ? 'Deactivating Forensic View' : 'Investigate Markers'}
              <Target className={`w-4 h-4 ${showHotspots ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Realistic Viewport */}
          <div className="flex-1 p-12 overflow-y-auto relative bg-[#fcfcfc] dark:bg-slate-950 custom-scrollbar">
            <div className="max-w-3xl mx-auto relative min-h-full">
              {/* Header Deception Flag */}
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeEmail.id}
                className="mb-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-medium text-slate-500 flex justify-between uppercase tracking-tighter"
              >
                <span>Headers: X-SPOOFED-IDENTITY</span>
                <span className="text-rose-500">Origin Verified: FALSE</span>
              </Motion.div>

              {activeEmail.content}

              {/* Absolute Hotspot Markers Layer */}
              <AnimatePresence>
                {showHotspots && activeEmail.hotspots.map((spot) => (
                  <Motion.div
                    key={spot.id}
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute z-20"
                  >
                    <button
                      onClick={() => handleHotspotClick(spot.id)}
                      className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all group/spot ${discoveredHotspots.includes(spot.id)
                          ? 'bg-emerald-500 border-white shadow-xl shadow-emerald-500/50'
                          : 'bg-rose-500 border-white shadow-xl shadow-rose-500/50 animate-bounce'
                        }`}
                    >
                      <Target className="w-6 h-6 text-white" />

                      {!discoveredHotspots.includes(spot.id) && (
                        <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-25"></div>
                      )}
                    </button>

                    {/* Professional Forensic Tooltip */}
                    {discoveredHotspots.includes(spot.id) && (
                      <Motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-80 p-8 bg-slate-900 border-2 border-emerald-500/30 rounded-[2rem] shadow-4xl text-left pointer-events-none z-30"
                      >
                        <div className="flex items-center gap-3 text-emerald-500 mb-4 font-mono">
                          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                          <span className="font-black text-[9px] uppercase tracking-[0.2em]">Malicious Vector: {spot.tactic}</span>
                        </div>
                        <h5 className="text-white font-black text-lg mb-3 uppercase italic tracking-tighter leading-none">{spot.title}</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-bold italic">{spot.description}</p>

                        {/* Decorative Tooltip Arrow */}
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-slate-900"></div>
                      </Motion.div>
                    )}
                  </Motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Visual Instruction Overlay */}
          {!showHotspots && discoveredHotspots.length === 0 && (
            <div className="absolute bottom-8 right-8 flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-black text-[10px] uppercase tracking-widest animate-pulse pointer-events-none">
              <MousePointer2 className="w-4 h-4" /> Click Investigate to start audit
            </div>
          )}
        </div>

        {/* Intelligence Progress Bar */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-10 relative z-10 w-full">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Threat Forensic Progress</span>
                <span className="text-[10px] font-mono font-black text-cyan-500">
                  {Math.round((discoveredHotspots.length / activeEmail.hotspots.length) * 100)}% COMPLETE
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner p-0.5">
                <Motion.div
                  key={activeEmail.id + discoveredHotspots.length}
                  initial={{ width: 0 }}
                  animate={{ width: `${(discoveredHotspots.length / activeEmail.hotspots.length) * 100}%` }}
                  className={`h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(6,182,212,0.5)] ${discoveredHotspots.length === activeEmail.hotspots.length ? 'bg-emerald-500' : 'bg-cyan-500'
                    }`}
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="text-3xl font-black text-slate-900 dark:text-white italic leading-none">
                {discoveredHotspots.length}<span className="text-slate-400 dark:text-slate-700 mx-1">/</span>{activeEmail.hotspots.length}
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Markers Found</span>
            </div>
          </div>

          <AnimatePresence>
            {discoveredHotspots.length === activeEmail.hotspots.length && (
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center gap-4 border border-emerald-500/20"
              >
                <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg shadow-emerald-500/50">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-black text-sm uppercase tracking-tighter italic text-emerald-600 dark:text-emerald-400">Section Neutralized: Forensic Analysis Complete</span>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
