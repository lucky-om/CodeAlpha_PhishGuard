// Coded by Lucky

import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShieldCheck, ShieldAlert, Scan, ExternalLink, X, ChevronDown } from 'lucide-react';

// Static hotspot annotations on the QR code area
const qrHotspots = [
  {
    id: 'qr-1',
    label: '1',
    top: '18%',
    left: '70%',
    color: 'amber',
    title: 'Sticker Over Original',
    tactic: 'Physical Replacement',
    description: 'Attackers print near-identical QR stickers and paste them over real codes on restaurant tables, parking meters, and utility bills. The human eye can\'t distinguish them.',
  },
  {
    id: 'qr-2',
    label: '2',
    top: '55%',
    left: '15%',
    color: 'rose',
    title: 'No Preview URL Shown',
    tactic: 'Destination Opacity',
    description: 'By design, QR codes hide their destination. Unlike links where you can hover to preview, scanning a QR code immediately redirects you — giving you zero chance to inspect the URL first.',
  },
  {
    id: 'qr-3',
    label: '3',
    top: '82%',
    left: '60%',
    color: 'rose',
    title: 'Trusted Brand Logo',
    tactic: 'Authority Spoofing',
    description: 'A legitimate-looking "Scan to Pay" or branded label beneath the QR code builds false trust. Any logo can be printed next to any QR code — logos mean nothing without verifying the URL.',
  },
];

const scanResultHotspots = [
  {
    id: 'res-1',
    label: 'A',
    color: 'rose',
    title: 'HTTP Not HTTPS',
    tactic: 'No Encryption',
    description: 'The scanned URL uses HTTP. Any banking, payment, or login page that doesn\'t use HTTPS is either fake or critically insecure. Real payment portals always enforce HTTPS.',
  },
  {
    id: 'res-2',
    label: 'B',
    color: 'rose',
    title: 'Hyphenated Fake Domain',
    tactic: 'Domain Impersonation',
    description: '"bank-auth-verify.com" combines legitimate-sounding keywords to appear trustworthy. Real bank domains are short and exact (e.g., hdfc.com, chase.com) — never hyphenated composites.',
  },
];

const colorMap = {
  rose:    { dot: 'bg-rose-600 shadow-rose-500/60',    ring: 'border-rose-500',    bg: 'bg-rose-500/10',    text: 'text-rose-500',    badge: 'border-rose-500/30' },
  amber:   { dot: 'bg-amber-500 shadow-amber-400/60',  ring: 'border-amber-500',   bg: 'bg-amber-500/10',   text: 'text-amber-500',   badge: 'border-amber-500/30' },
  emerald: { dot: 'bg-emerald-600 shadow-emerald-500/60', ring: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-500', badge: 'border-emerald-500/30' },
};

export default function QuishingLab() {
  const [isScanning, setIsScanning]     = useState(false);
  const [scanResult, setScanResult]     = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const mockScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setActiveHotspot(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        url: 'http://secure-login.bank-auth-verify.com/update',
        tactic: 'Quishing (QR Phishing)',
        description: 'This QR code leads to a cloned banking portal designed to harvest login credentials and payment data.',
      });
    }, 2500);
  };

  const toggleHotspot = (spot) => {
    setActiveHotspot((prev) => (prev?.id === spot.id ? null : spot));
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ── Left: Info + QR Interactive Zone ── */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
              Security Lab: QR Code Analysis
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
              <QrCode className="w-8 h-8 text-emerald-500 shrink-0" />
              The "Quishing" Threat
            </h3>
            <p className="text-slate-500 leading-relaxed">
              QR codes are opaque by design — you can't preview where they go before scanning. Attackers exploit this blindspot by printing fake codes and placing them over legitimate ones in public spaces.
            </p>
          </div>

          {/* QR Code with hotspot beacons overlay */}
          <div className="relative w-full max-w-xs mx-auto group">
            <div className="p-6 bg-white rounded-3xl shadow-2xl border-4 border-slate-100 relative overflow-hidden select-none">
              {/* PayPal phishing QR image — user must drop paypal_phishing_qr.png in /public */}
              <img
                src="/paypal_phishing_qr.png"
                alt="Suspicious PayPal QR Code Simulation"
                className="w-full h-auto opacity-90 rounded-xl"
                draggable={false}
                onError={(e) => {
                  // Graceful fallback to the old QR if the new one hasn't been placed yet
                  e.currentTarget.src = '/sample_phishing_qr_1775843127186.png';
                  e.currentTarget.onerror = null;
                }}
              />

              {/* Scanner animation */}
              {isScanning && (
                <Motion.div
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] z-10"
                />
              )}

              {/* Glassmorphic label */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl px-4 py-2 text-center border border-slate-200">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  PayPal · Scan to Pay
                </span>
              </div>
            </div>

            {/* Hotspot Beacons */}
            {!isScanning && qrHotspots.map((spot) => {
              const c = colorMap[spot.color];
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div key={spot.id}>
                  <button
                    onClick={() => toggleHotspot(spot)}
                    style={{ top: spot.top, left: spot.left }}
                    className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 group/bt`}
                    title={spot.title}
                  >
                    {!isActive && (
                      <span className={`absolute inset-0 rounded-full ${c.dot} animate-ping opacity-40`} />
                    )}
                    <span className={`relative w-8 h-8 rounded-full ${c.dot} border-4 border-white shadow-lg text-white text-[11px] font-black flex items-center justify-center transition-all duration-200 ${isActive ? 'scale-125 ring-2 ring-white ring-offset-1' : 'group-hover/bt:scale-110'}`}>
                      {spot.label}
                    </span>
                  </button>

                  {/* Inline popover directly on QR */}
                  <AnimatePresence>
                    {isActive && (
                      <Motion.div
                        key={`qr-pop-${spot.id}`}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute z-30 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 overflow-hidden pointer-events-auto ${c.ring}`}
                        style={{
                          top: `calc(${spot.top} + 6%)`,
                          left: parseFloat(spot.left) > 50 ? 'auto' : spot.left,
                          right: parseFloat(spot.left) > 50 ? '2%' : 'auto',
                          transform: parseFloat(spot.left) > 50 ? 'none' : 'translateX(0)',
                        }}
                      >
                        <div className={`px-4 py-3 flex items-start justify-between gap-2 ${c.bg} border-b ${c.ring}`}>
                          <div className="space-y-0.5 min-w-0">
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${c.text} block`}>{spot.tactic}</span>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">{spot.title}</h4>
                          </div>
                          <button onClick={() => setActiveHotspot(null)} className="shrink-0 p-0.5 rounded-md hover:bg-black/10 transition-colors">
                            <X className="w-3 h-3 text-slate-500" />
                          </button>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{spot.description}</p>
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Hover scan button */}
            {!isScanning && !scanResult && (
              <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none">
                <div className="pointer-events-auto">
                  <button
                    onClick={mockScan}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-2xl text-sm hover:scale-105 transition-all active:scale-95"
                  >
                    <Scan className="w-4 h-4" /> Simulate Scan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Always-visible scan button */}
          {!scanResult && (
            <div className="flex justify-center">
              <button
                onClick={mockScan}
                disabled={isScanning}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                {isScanning ? <Scan className="w-5 h-5 animate-spin" /> : <Scan className="w-5 h-5" />}
                {isScanning ? 'Scanning...' : 'Simulate QR Scan'}
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Forensic Intelligence Panel ── */}
        <div className="space-y-6">
          {/* QR Beacon Legend */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              Tap numbered beacons on QR to investigate:
            </p>
            {qrHotspots.map((spot) => {
              const c = colorMap[spot.color];
              const isActive = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => toggleHotspot(spot)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 hover:scale-[1.01] group ${isActive ? `${c.bg} ${c.ring}` : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'}`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full ${c.dot} text-white text-[11px] font-black flex items-center justify-center shadow-lg`}>
                    {spot.label}
                  </span>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className={`text-[9px] font-black uppercase tracking-widest ${c.text}`}>{spot.tactic}</div>
                    <div className="font-black text-slate-900 dark:text-white text-sm">{spot.title}</div>
                    {isActive && (
                      <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                        {spot.description}
                      </Motion.p>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* ── Scan Result ── */}
          <AnimatePresence>
            {scanResult && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="rounded-3xl border-2 border-rose-500/40 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
              >
                <div className="px-6 py-5 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    <span className="text-sm font-black text-rose-500 uppercase tracking-wider">{scanResult.tactic} Detected</span>
                  </div>
                  <button onClick={() => { setScanResult(null); setActiveHotspot(null); }} className="p-1 rounded-lg hover:bg-rose-500/10 transition-colors">
                    <X className="w-4 h-4 text-rose-400" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div className="p-4 bg-slate-950 rounded-2xl font-mono text-xs border border-slate-800">
                    <span className="text-slate-500 block mb-1 text-[9px] uppercase tracking-widest">Decoded Destination URL:</span>
                    <p className="text-rose-400 font-bold break-all">{scanResult.url}</p>
                  </div>

                  {/* Scan result hotspots */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">URL Forensic Breakdown:</p>
                    {scanResultHotspots.map((spot) => {
                      const c = colorMap[spot.color];
                      const isActive = activeHotspot?.id === spot.id;
                      return (
                        <button
                          key={spot.id}
                          onClick={() => toggleHotspot(spot)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 hover:scale-[1.01] group ${isActive ? `${c.bg} ${c.ring}` : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:shadow-md'}`}
                        >
                          <span className={`shrink-0 w-6 h-6 rounded-full ${c.dot} text-white text-[10px] font-black flex items-center justify-center shadow`}>
                            {spot.label}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className={`text-[9px] font-black uppercase tracking-widest ${c.text}`}>{spot.tactic}</div>
                            <div className="font-black text-slate-900 dark:text-white text-sm">{spot.title}</div>
                            {isActive && (
                              <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500 leading-relaxed font-medium pt-2">
                                {spot.description}
                              </Motion.p>
                            )}
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-3 px-4 bg-rose-500 text-white rounded-xl text-center font-black text-[10px] uppercase tracking-widest animate-pulse">MALICIOUS</div>
                    <div className="py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl text-center text-[10px] flex items-center justify-center gap-1.5 font-bold opacity-50 cursor-not-allowed">
                      <ExternalLink className="w-3 h-3" /> DO NOT OPEN
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Safe Practice Cards */}
          <div className="space-y-3">
            <div className="flex gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors group">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white">Safe Practice:</strong> Use a QR scanner that previews the full destination URL before navigating. Never scan codes pasted over existing signs.
              </p>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 hover:border-rose-500/40 transition-colors group">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white">Red Flag:</strong> If a QR code leads to a URL using HTTP or a hyphenated domain you don't recognize, exit immediately without entering any credentials.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
