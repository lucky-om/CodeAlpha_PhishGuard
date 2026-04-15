// Coded by Lucky

import { useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, ExternalLink, Lock, Globe, Search,
  Eye, Monitor, CreditCard, X, MousePointer2, ChevronDown
} from 'lucide-react';

const anatomyData = [
  {
    id: 'gpay',
    brand: 'Google Pay',
    title: 'Deceptive Payment Verification',
    description: 'Attackers create fake payment verification portals to harvest banking credentials and UPI PINs.',
    url: 'https://gpay.secure-verify-up.in/login',
    hotspots: [
      {
        id: 1, top: '12%', left: '42%',
        popoverSide: 'bottom',
        title: 'Suspicious Domain',
        tactic: 'Domain Impersonation',
        content: '"secure-verify-up.in" is NOT owned by Google. The real Google Pay uses pay.google.com. Attackers add words like "secure" and "verify" to appear trustworthy. Always verify the full domain — not just the keywords.',
      },
      {
        id: 2, top: '38%', left: '72%',
        popoverSide: 'left',
        title: 'Urgency Banner',
        tactic: 'Psychological Pressure',
        content: '"Account will be blocked" forces an immediate panic response. This deliberate urgency shortens your decision window so you act without inspecting the URL or contacting the real bank.',
      },
      {
        id: 3, top: '78%', left: '50%',
        popoverSide: 'top',
        title: 'UPI PIN Request',
        tactic: 'Credential Harvesting',
        content: 'Official Google Pay and all RBI-regulated apps NEVER ask for your UPI PIN on a website. The PIN is exclusively entered inside the secure, sandboxed app environment. Any web page asking for it is 100% fraudulent.',
      },
    ],
    html: (
      <div className="bg-white h-full flex flex-col items-center p-8 font-sans">
        <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="w-24 mb-8" />
        <div className="w-full max-w-sm border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
            <span className="text-xs font-bold text-rose-700 uppercase">Action Required: Verify Account</span>
          </div>
          <h4 className="font-bold text-slate-800">Verify your Google Pay Account</h4>
          <p className="text-sm text-slate-600">Your account has been flagged for suspicious activity. Please verify your UPI PIN to continue.</p>
          <div className="space-y-4">
            <input disabled type="password" placeholder="Enter UPI PIN" className="w-full p-3 border rounded-lg text-sm bg-slate-50" />
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg">Verify Now</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'netflix',
    brand: 'Netflix',
    title: 'Subscription Renewal Phish',
    description: 'One of the most common phishing attacks — stealing credit card details by simulating a payment failure.',
    url: 'https://netflix-billing-update.com/account',
    hotspots: [
      {
        id: 1, top: '10%', left: '45%',
        popoverSide: 'bottom',
        title: 'Fake Domain with Suspicious TLD',
        tactic: 'Domain Spoofing',
        content: '"netflix-billing-update.com" is not Netflix. Netflix only communicates from netflix.com. Any domain containing the brand name as a prefix or with a hyphenated suffix is almost certainly malicious.',
      },
      {
        id: 2, top: '32%', left: '14%',
        popoverSide: 'right',
        title: 'Off-Brand Logo Quality',
        tactic: 'Visual Fidelity Attack',
        content: 'Phishing sites often have slightly misaligned logos, wrong font weights, or incorrect brand colors. The Netflix logo here uses a slightly different red (#D40000 vs the real #E50914). Pixel differences are intentional to avoid automated detection.',
      },
      {
        id: 3, top: '68%', left: '78%',
        popoverSide: 'left',
        title: 'Full Card Data on First Page',
        tactic: 'Data Harvesting',
        content: 'Asking for Card Number, Expiry, AND CVV all at once — before even verifying your identity — is a critical red flag. Real streaming platforms prompt for individual fields progressively and never ask for CVV during routine billing updates.',
      },
    ],
    html: (
      <div className="bg-black h-full flex flex-col items-center p-8 font-sans">
        <div className="w-full flex justify-between items-center mb-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="w-24" />
        </div>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-white">Update your payment method.</h1>
          <p className="text-white/70">Your last payment failed. Update your billing information to keep watching.</p>
          <div className="space-y-4">
            <input disabled placeholder="Card Number" className="w-full p-4 bg-zinc-800 text-white rounded border-none" />
            <div className="flex gap-4">
              <input disabled placeholder="Expiry (MM/YY)" className="w-1/2 p-4 bg-zinc-800 text-white rounded border-none" />
              <input disabled placeholder="CVV" className="w-1/2 p-4 bg-zinc-800 text-white rounded border-none" />
            </div>
            <button className="w-full py-4 bg-red-600 text-white font-bold rounded">SAVE &amp; CONTINUE</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'google-search',
    brand: 'Search Engine Phishing',
    title: 'Malvertising via Google Ads',
    description: 'Attackers pay for sponsored ads to place malicious links at the top of search results, bypassing organic safety checks.',
    url: 'https://support.google.com/search?q=Metamask+Login',
    hotspots: [
      {
        id: 1, top: '26%', left: '14%',
        popoverSide: 'right',
        title: '"Sponsored" Doesn\'t Mean Safe',
        tactic: 'Malvertising',
        content: 'Google Ads allows anyone to pay for any keyword. Even legitimate-looking ads can link to phishing pages. Google only verifies payment, not the safety of the destination site. Never trust ranking alone.',
      },
      {
        id: 2, top: '30%', left: '42%',
        popoverSide: 'bottom',
        title: 'Typosquatted URL in Ad',
        tactic: 'Homograph / Typosquat',
        content: '"nmetarnask.io" uses the classic "rn" → "m" trick (replace m with r+n). At a glance, it reads as "metamask". Always hover over a link in search results to expand the URL bar tooltip before clicking.',
      },
      {
        id: 3, top: '60%', left: '20%',
        popoverSide: 'right',
        title: 'Fabricated Authority in Headline',
        tactic: 'Social Engineering',
        content: '"Official Secure Login" and "Most Trusted Crypto Wallet" in the ad headline builds false authority. These claims are self-asserted and completely unverified by Google. Legitimate sites don\'t need to call themselves "official" in an ad.',
      },
    ],
    html: (
      <div className="bg-white h-full p-8 font-sans text-slate-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="w-20" />
            <div className="flex-1 bg-slate-100 rounded-full h-10 px-4 flex items-center text-sm text-slate-600">Metamask Wallet Extension</div>
          </div>
          {/* Malicious sponsored result */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-900 border border-slate-300 px-1 rounded text-[10px]">Sponsored</span>
              <span>· https://www.nmetarnask.io</span>
            </div>
            <h3 className="text-xl text-blue-700 font-medium hover:underline cursor-pointer">Metamask Official — Secure Wallet Login &amp; Extension</h3>
            <p className="text-sm text-slate-600">Download the most trusted crypto wallet. Access your assets securely. Official site of Metamask.</p>
          </div>
          {/* Real result faded */}
          <div className="space-y-1 mt-8 opacity-30">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>https://metamask.io</span>
            </div>
            <h3 className="text-xl text-blue-700 font-medium">MetaMask | A crypto wallet &amp; gateway to blockchain apps</h3>
            <p className="text-sm text-slate-600">Trusted by over 30 million users worldwide.</p>
          </div>
        </div>
      </div>
    ),
  },
];

// Determine responsive classes instead of inline style
function getPopoverClasses(spot) {
  const base = "fixed sm:absolute z-50 max-sm:bottom-6 max-sm:left-4 max-sm:right-4 max-sm:w-auto w-56 sm:w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-cyan-500/60 overflow-hidden pointer-events-auto";
  const mobileReset = "sm:bottom-auto sm:right-auto sm:left-auto";
  
  switch (spot.popoverSide) {
    case 'bottom': return `${base} ${mobileReset} sm:left-1/2 sm:-translate-x-1/2 sm:top-full sm:mt-5`;
    case 'top':    return `${base} ${mobileReset} sm:left-1/2 sm:-translate-x-1/2 sm:bottom-full sm:mb-5`;
    case 'left':   return `${base} ${mobileReset} sm:right-full sm:-translate-y-1/2 sm:top-1/2 sm:mr-5`;
    case 'right':  return `${base} ${mobileReset} sm:left-full sm:-translate-y-1/2 sm:top-1/2 sm:ml-5`;
    default:       return `${base} ${mobileReset} sm:left-1/2 sm:-translate-x-1/2 sm:top-full sm:mt-5`;
  }
}

export default function WebsiteAnatomy() {
  const [activeTab, setActiveTab] = useState(anatomyData[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const mockupRef = useRef(null);

  const handleTabChange = (brand) => {
    setActiveTab(brand);
    setActiveHotspot(null);
  };

  const toggleHotspot = (spot) => {
    setActiveHotspot((prev) => (prev?.id === spot.id ? null : spot));
  };

  return (
    <div className="space-y-8">

      {/* Scenario selector */}
      <div className="sticky top-20 z-50 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap gap-3 justify-center max-w-7xl mx-auto px-4">
          {anatomyData.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleTabChange(brand)}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all border-2 flex items-center gap-2 text-sm hover:scale-105 active:scale-95 ${activeTab.id === brand.id
                ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-cyan-500/50 hover:shadow-md'
              }`}
            >
              {brand.id === 'gpay'         && <CreditCard className="w-4 h-4" />}
              {brand.id === 'netflix'      && <Monitor className="w-4 h-4" />}
              {brand.id === 'google-search'&& <Search className="w-4 h-4" />}
              {brand.brand}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start px-4">

        {/* ── Left panel ── */}
        <div className="xl:col-span-4 space-y-6 order-2 xl:order-1">
          <Motion.div key={activeTab.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-mono font-bold uppercase tracking-widest">
              Forensic Analysis Case
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTab.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{activeTab.description}</p>
          </Motion.div>

          {/* Hotspot list */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Click beacons on the page mockup:
            </p>
            {activeTab.hotspots.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => toggleHotspot(spot)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 hover:scale-[1.01] group ${isActive
                    ? 'bg-rose-500/10 border-rose-500'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-rose-500/40 hover:shadow-lg'
                  }`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black shadow-lg transition-all duration-200 ${isActive ? 'bg-cyan-600 scale-110' : 'bg-rose-600 group-hover:scale-110'}`}>
                    {spot.id}
                  </span>
                  <div className="min-w-0 space-y-0.5 flex-1">
                    <div className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-rose-500' : 'text-slate-400'}`}>{spot.tactic}</div>
                    <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">{spot.title}</div>
                    {isActive && (
                      <Motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-2">
                        {spot.content}
                      </Motion.p>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180 text-rose-400' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Idle state */}
          {!activeHotspot && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 text-xs font-mono italic space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 font-black text-[9px] uppercase tracking-widest">
                <Eye className="w-4 h-4" /> Forensic Intel
              </div>
              <p>Select a numbered beacon on the browser mockup or click a row above to reveal tactical analysis.</p>
              <div className="flex gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
            </div>
          )}
        </div>

        {/* ── Right panel: browser mockup ── */}
        <div className="xl:col-span-8 order-1 xl:order-2">
          {/* On mobile, allow horizontal scroll so the browser chrome isn't crushed */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[340px]">
              <div className="bg-slate-300 dark:bg-slate-800 rounded-[2.5rem] p-1.5 shadow-2xl">

                {/* Fake browser chrome bar */}
                <div className="flex items-center gap-4 px-6 py-4 bg-slate-100 dark:bg-slate-900 rounded-t-[2.2rem] border-b dark:border-slate-800">
                  <div className="flex gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-2xl bg-white dark:bg-slate-950 px-4 py-2.5 rounded-2xl text-xs font-mono flex items-center gap-2 border-2 border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-slate-400 dark:text-slate-500 truncate select-none text-[10px]">{activeTab.url}</span>
                  </div>
                  <div className="flex gap-2 text-slate-400 dark:text-slate-600 shrink-0">
                    <Globe className="w-4 h-4" />
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Phishing page + beacon overlay */}
                <div ref={mockupRef} className="relative overflow-hidden rounded-b-[2.2rem] min-h-[480px] sm:min-h-[520px] bg-white border-2 border-t-0 dark:border-slate-800">

                  {/* Phishing page */}
                  <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                      <Motion.div key={activeTab.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        {activeTab.html}
                      </Motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Beacon overlay */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {activeTab.hotspots.map((spot) => {
                      const isActive = activeHotspot?.id === spot.id;
                      return (
                        <div key={spot.id} className="absolute pointer-events-auto" style={{ top: spot.top, left: spot.left }}>
                          {/* Beacon dot */}
                          <button
                            onClick={() => toggleHotspot(spot)}
                            className="absolute w-8 h-8 sm:w-11 sm:h-11 -ml-4 -mt-4 sm:-ml-5 sm:-mt-5 flex items-center justify-center group"
                            title={spot.title}
                          >
                            {!isActive && (
                              <>
                                <span className="absolute inset-0 w-full h-full rounded-full bg-rose-500/30 animate-[ping_1.5s_infinite] scale-150" />
                                <span className="absolute inset-2 rounded-full bg-rose-500/15 animate-[ping_2.2s_infinite]" />
                              </>
                            )}
                            <span className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(225,29,72,0.6)] flex items-center justify-center text-[10px] sm:text-xs font-black text-white group-hover:scale-125 transition-all duration-300 ${isActive ? 'bg-cyan-600 scale-125' : 'bg-rose-600'}`}>
                              {spot.id}
                            </span>
                          </button>

                          {/* Adaptive popover — Bottom sheet on mobile, adjacent on desktop */}
                          <AnimatePresence>
                            {isActive && (
                              <Motion.div
                                key={`pop-${spot.id}`}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className={getPopoverClasses(spot)}
                              >
                                <div className="bg-cyan-500/10 px-4 py-3 flex items-start justify-between gap-3 border-b border-cyan-500/20">
                                  <div className="space-y-0.5 min-w-0">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-500 block">
                                      {spot.tactic}
                                    </span>
                                    <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                                      {spot.title}
                                    </h4>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                    className="shrink-0 p-1.5 -mr-1.5 rounded-lg hover:bg-black/10 transition-colors"
                                  >
                                    <X className="w-4 h-4 text-slate-500" />
                                  </button>
                                </div>
                                <div className="px-4 py-3 bg-white dark:bg-slate-900">
                                  <p className="text-[11px] sm:text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {spot.content}
                                  </p>
                                </div>
                              </Motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Transition flash */}
                  <AnimatePresence>
                    <Motion.div
                      key={activeTab.id + '-overlay'}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-30 pointer-events-none"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
