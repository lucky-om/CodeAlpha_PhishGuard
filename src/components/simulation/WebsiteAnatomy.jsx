/* coded by lucky */
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Info, ExternalLink, MousePointer2, AlertTriangle, 
  Lock, Globe, Search, ArrowRight, Eye, Monitor, CreditCard
} from 'lucide-react';

const anatomyData = [
  {
    id: 'gpay',
    brand: 'Google Pay',
    title: 'Deceptive Payment Verification',
    description: 'Attackers create fake payment verification portals to harvest banking credentials and UPI PINs.',
    url: 'https://gpay.secure-verify-up.in/login',
    logo: 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    hotspots: [
      { id: 1, top: '10%', left: '40%', title: 'The URL', content: 'Notice the domain: "secure-verify-up.in" instead of "google.com". Attackers use hyphens and keywords like "secure" to deceive you.' },
      { id: 2, top: '45%', left: '70%', title: 'Urgency Banner', content: 'Phrases like "Account will be blocked if not verified within 2 hours" force quick, emotional decisions.' },
      { id: 3, top: '75%', left: '50%', title: 'PIN Request', content: 'Official apps never ask for your UPI PIN or Bank Password on a website. They only ask for it inside the secure app interface.' }
    ],
    html: (
      <div className="bg-white h-full flex flex-col items-center p-8 font-sans">
        <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="w-24 mb-8" />
        <div className="w-full max-w-sm border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-3">
             <AlertTriangle className="w-5 h-5 text-rose-500" />
             <span className="text-xs font-bold text-rose-700 uppercase">Action Required: Verify Account</span>
          </div>
          <h4 className="font-bold text-slate-800">Verify your Google Pay Account</h4>
          <p className="text-sm text-slate-600">Your account has been flagged for suspicious activity. Please verify your UPI PIN to continue using G-Pay services.</p>
          <div className="space-y-4">
             <input disabled type="password" placeholder="Enter UPI PIN" className="w-full p-3 border rounded-lg text-sm bg-slate-50" />
             <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg">Verify Now</button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'netflix',
    brand: 'Netflix',
    title: 'Subscription Renewal Phish',
    description: 'One of the most common phishing attacks. Aimed at stealing Credit Card details by claiming a payment failure.',
    url: 'https://netflix-billing-update.com/account',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    hotspots: [
      { id: 1, top: '12%', left: '45%', title: 'Suspicious TLD', content: 'Netflix uses "netflix.com". Any domain like "netflix-billing.com" is 100% malicious.' },
      { id: 2, top: '35%', left: '15%', title: 'Low Quality Images', content: 'Phishing sites often have slightly pixelated logos or non-standard fonts that don\'t quite match the real brand experience.' },
      { id: 3, top: '65%', left: '80%', title: 'Data Harvesting', content: 'Look at the data requested: CCV, Expiry, and Full Name all on one page before even logging in is a massive red flag.' }
    ],
    html: (
      <div className="bg-black h-full flex flex-col items-center p-8 font-sans">
        <div className="w-full flex justify-between items-center mb-12">
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="w-24" />
        </div>
        <div className="w-full max-w-md space-y-8">
           <h1 className="text-3xl font-bold text-white">Update your payment method.</h1>
           <p className="text-white/80">Your last payment failed. Please update your billing information to keep watching the latest movies and TV shows.</p>
           <div className="space-y-4">
              <input disabled placeholder="Card Number" className="w-full p-4 bg-zinc-800 border-none text-white rounded" />
              <div className="flex gap-4">
                 <input disabled placeholder="Expiry (MM/YY)" className="w-1/2 p-4 bg-zinc-800 border-none text-white rounded" />
                 <input disabled placeholder="CVV" className="w-1/2 p-4 bg-zinc-800 border-none text-white rounded" />
              </div>
              <button className="w-full py-4 bg-red-600 text-white font-bold rounded">SAVE & CONTINUE</button>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'google-search',
    brand: 'Google Search',
    title: 'Search Engine Phishing',
    description: 'Attackers use paid ads to place malicious links at the top of Google Search results, bypassing organic safety checks.',
    url: 'https://support.google.com/search?q=Metamask+Login',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    hotspots: [
      { id: 1, top: '25%', left: '15%', title: 'Sponsored Tag', content: 'Malicious actors frequently pay for ads. Just because it is a "Sponsored" result doesn\'t mean Google has verified the content of the site.' },
      { id: 2, top: '28%', left: '40%', title: 'The Fake URL', content: 'A common tactic: "nmetarnask.io" (replacing m with rn). Always hover over a link in search results to see the actual destination.' },
      { id: 3, top: '60%', left: '20%', title: 'Malicious Call to Action', content: 'Headlines like "Official Secure Login" are used to build trust before leading you to a seed phrase harvesting page.' }
    ],
    html: (
      <div className="bg-white dark:bg-slate-900 h-full p-8 font-sans text-slate-900 dark:text-slate-100">
        <div className="max-w-2xl mx-auto space-y-6">
           <div className="flex items-center gap-4 mb-8">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="w-20" />
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-10 px-4 flex items-center text-sm">Metamask Wallet Extension</div>
           </div>
           
           {/* Malicious Result */}
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                 <span className="font-bold text-slate-900 dark:text-white">Sponsored</span>
                 <span>· https://www.nmetarnask.io</span>
              </div>
              <h3 className="text-xl text-blue-700 dark:text-blue-400 font-medium hover:underline cursor-pointer">Metamask Official - Secure Wallet Login & Extension</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Download the most trusted crypto wallet. Access your assets securely. Official site of Metamask. Secure your seed phrase now.</p>
           </div>

           {/* Real Result */}
           <div className="space-y-1 mt-8 opacity-40">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                 <span>https://metamask.io</span>
              </div>
              <h3 className="text-xl text-blue-700 dark:text-blue-400 font-medium">MetaMask | A crypto wallet & gateway to blockchain apps</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">A crypto wallet & gateway to blockchain apps. Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide.</p>
           </div>
        </div>
      </div>
    )
  }
];

export default function WebsiteAnatomy() {
  const [activeTab, setActiveTab] = useState(anatomyData[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  /**
   * ACT AS SECURE CODING PERSON:
   * Ensure the UI is clear and interactive while maintaining high contrast for educational efficacy.
   */
  return (
    <div className="space-y-8">
      {/* Brand Selection Tabs - STICKY TOP */}
      <div className="sticky top-0 z-50 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
         <div className="flex flex-wrap gap-3 justify-center max-w-7xl mx-auto px-4">
            {anatomyData.map((brand) => (
               <button
                  key={brand.id}
                  onClick={() => { setActiveTab(brand); setHoveredHotspot(null); }}
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all border-2 flex items-center gap-2 text-sm ${
                     activeTab.id === brand.id 
                     ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-600/20' 
                     : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-cyan-500/50'
                  }`}
               >
                  {brand.id === 'gpay' && <CreditCard className="w-4 h-4" />}
                  {brand.id === 'netflix' && <Monitor className="w-4 h-4" />}
                  {brand.id === 'google-search' && <Search className="w-4 h-4" />}
                  {brand.brand}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start px-4">
        {/* Info Area */}
        <div className="xl:col-span-4 space-y-6 order-2 xl:order-1">
          <Motion.div
            key={activeTab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-mono font-bold uppercase tracking-widest">
               Forensic Analysis Case
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
               {activeTab.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-md font-medium">
               {activeTab.description}
            </p>
            
            <div className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 text-slate-400 space-y-6 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <Bug className="w-20 h-20 text-white" />
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">
                  <Eye className="w-4 h-4" /> Technical Insights
               </div>
               <AnimatePresence mode="wait">
                  {hoveredHotspot ? (
                    <Motion.div
                       key={hoveredHotspot.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="space-y-3 relative z-10"
                    >
                       <h4 className="font-black text-white flex items-center gap-3 text-lg">
                          <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-sm">{hoveredHotspot.id}</span>
                          {hoveredHotspot.title}
                       </h4>
                       <p className="text-sm leading-relaxed text-slate-300 italic">{hoveredHotspot.content}</p>
                    </Motion.div>
                  ) : (
                    <Motion.div 
                       key="empty"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="space-y-4 relative z-10"
                    >
                       <p className="text-sm italic text-slate-500">
                          PROMPT: Initiate interactive audit by hovering over the pulsing forensic beacons on the browser mockup.
                       </p>
                       <div className="flex gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                       </div>
                    </Motion.div>
                  )}
               </AnimatePresence>
            </div>
          </Motion.div>
        </div>

        {/* Browser Mockup Area */}
        <div className="xl:col-span-8 order-1 xl:order-2">
           <div className="bg-slate-300 dark:bg-slate-800 rounded-[2.5rem] p-1.5 shadow-3xl relative">
              {/* Browser Controls */}
              <div className="flex items-center gap-4 px-8 py-5 bg-slate-100 dark:bg-slate-900 rounded-t-[2.2rem] border-b dark:border-slate-800">
                 <div className="flex gap-2.5 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-inner"></div>
                 </div>
                 <div className="flex-1 max-w-2xl bg-white dark:bg-slate-950 px-5 py-3 rounded-2xl text-xs font-mono flex items-center gap-3 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-400 dark:text-slate-500 truncate select-none">{activeTab.url}</span>
                 </div>
                 <div className="flex gap-5 text-slate-400 dark:text-slate-600">
                    <Globe className="w-5 h-5 hover:text-cyan-500 cursor-pointer transition-colors" />
                    <ExternalLink className="w-5 h-5" />
                 </div>
              </div>

              {/* Interaction Layer */}
              <div className="relative overflow-hidden rounded-b-[2.2rem] min-h-[550px] bg-white border-2 border-t-0 dark:border-slate-800">
                 <div className="absolute inset-0 z-0">
                    {activeTab.html}
                 </div>
                 
                 {/* Beacons Overlay - HIGH VISIBILITY */}
                 <div className="absolute inset-0 z-20 pointer-events-none">
                    {activeTab.hotspots.map((spot) => (
                       <button
                          key={spot.id}
                          onMouseEnter={() => setHoveredHotspot(spot)}
                          onMouseLeave={() => setHoveredHotspot(null)}
                          className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center group pointer-events-auto"
                          style={{ top: spot.top, left: spot.left }}
                       >
                          <span className="absolute inset-0 w-full h-full rounded-full bg-rose-500/40 animate-[ping_1.5s_infinite] scale-150"></span>
                          <span className="absolute inset-2 w-full h-full rounded-full bg-rose-500/20 animate-[ping_2s_infinite]"></span>
                          <span className="relative w-8 h-8 rounded-full bg-rose-600 border-4 border-white dark:border-slate-900 shadow-[0_0_20px_rgba(225,29,72,0.5)] flex items-center justify-center text-xs font-black text-white group-hover:scale-125 group-hover:bg-cyan-600 transition-all duration-300">
                             {spot.id}
                          </span>
                       </button>
                    ))}
                 </div>
                 
                 {/* Glassmorphic Overlay on selection change */}
                 <AnimatePresence>
                    <Motion.div
                       key={activeTab.id + 'overlay'}
                       initial={{ opacity: 1 }}
                       animate={{ opacity: 0 }}
                       transition={{ duration: 0.8 }}
                       className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm z-30 pointer-events-none"
                    />
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
const Bug = ({ className }) => <ShieldAlert className={className} />;
