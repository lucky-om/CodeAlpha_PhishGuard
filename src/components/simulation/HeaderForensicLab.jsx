// Coded by Lucky

import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FileSearch, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, X } from 'lucide-react';

const headerHotspots = [
  {
    id: 'hdr-return-path',
    label: '1',
    color: 'rose',
    title: 'Mismatched Return-Path',
    tactic: 'Email Spoofing',
    description: 'The "Return-Path" is the real mailbox where bounced or undelivered messages go. Here it points to "marketing-tracker-server.ru" — a completely different domain from the claimed "microsoft.com" sender. This mismatch is definitive proof of spoofing.',
  },
  {
    id: 'hdr-received',
    label: '2',
    color: 'rose',
    title: 'Suspicious Relay Server',
    tactic: 'Origin Tracing',
    description: '"mail-gateway.ru" is a Russian bulk-mail server commonly used for spam campaigns. Legitimate Microsoft emails always originate from Microsoft-owned servers (*.microsoft.com or *.outlook.com). Any .ru relay in a Microsoft email is highly suspicious.',
  },
  {
    id: 'hdr-from',
    label: '3',
    color: 'amber',
    title: '"From" Field is User-Controlled',
    tactic: 'Display Name Spoofing',
    description: 'The "From" header visible to you in any email client can be freely set by the sender to any value. This is not cryptographically verified. Only SPF, DKIM, and DMARC records prove whether the real sending infrastructure is authorized.',
  },
  {
    id: 'hdr-ip',
    label: '4',
    color: 'amber',
    title: 'Foreign Origin IP',
    tactic: 'IP Geolocation',
    description: 'IP 185.122.1.42 resolves to an Eastern European hosting provider with a known spam history. Microsoft\'s SMTP servers always resolve to Microsoft-owned IP ranges (e.g., 40.107.x.x, 52.x.x.x). An unrelated IP range confirms the email is not genuinely from Microsoft.',
  },
];

const colorMap = {
  rose: { dot: 'bg-rose-600', ring: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-500', hl: 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-500' },
  amber: { dot: 'bg-amber-500', ring: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-500', hl: 'bg-amber-500/15 text-amber-300 border-l-4 border-amber-500' },
};

export default function HeaderForensicLab() {
  const [activeTab, setActiveTab] = useState('raw');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFindings, setShowFindings] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const rawLines = [
    { text: 'Delivered-To: user@example.com' },
    { text: 'Received: by 2002:a05:620a:208b:b0:78a:5c2a:13d with SMTP id d11csp1028753qkh;' },
    { text: '        Tue, 24 Dec 2024 02:45:12 -0800 (PST)' },
    { text: 'X-Google-Smtp-Source: AGHT+IFeUj/6W9U0J9pS5Ld8sB9tZ2g==' },
    { text: 'Return-Path: <bounce-back@marketing-tracker-server.ru>', hotspot: 'hdr-return-path' },
    { text: 'Received: from mx-out.mail-gateway.ru (mx-out.mail-gateway.ru. [185.122.1.42])', hotspot: 'hdr-received' },
    { text: '        by mx.google.com with ESMTPS id o18si12740447pgn.512.2024.12.24.02.45.11' },
    { text: '        for <user@example.com>' },
    { text: 'From: "Microsoft Support" <support@microsoft.com>', hotspot: 'hdr-from' },
    { text: 'Subject: Security Alert: Your Account was accessed from a new device' },
  ];

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setShowFindings(false);
    setActiveHotspot(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFindings(true);
    }, 2200);
  };

  const toggleHotspot = (spot) => setActiveHotspot(prev => prev?.id === spot.id ? null : spot);
  const getLineHotspot = (line) => line.hotspot ? headerHotspots.find(h => h.id === line.hotspot) : null;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ── Left: Explanation + hotspot legend ── */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
              Forensic Level: Advanced
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
              <FileSearch className="w-8 h-8 text-emerald-500 shrink-0" />
              Header Forensic Lab
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              Attackers can freely set the "From" field visible in your email client. But the technical metadata — the <strong>Return-Path</strong>, <strong>Received</strong> chain, and <strong>Origin IP</strong> — cannot be faked. Run analysis to expose the spoofing, then tap numbered beacons to investigate each field.
            </p>
          </div>

          {/* Educational explainer for Return-Path — shown before analysis to prime the user */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              The Shadow Header (Return-Path)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Real senders always have a matching <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">From</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">Return-Path</code>. A mismatch — especially to a foreign domain — is a definitive spoofing indicator.
            </p>
          </div>

          {/* Hotspot legend — only shown after the analysis runs */}
          {showFindings && (
            <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Click a highlighted line or a row below:
              </p>
              {headerHotspots.map((spot) => {
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
            </Motion.div>
          )}
        </div>

        {/* ── Right: Terminal workstation + decoded view ── */}
        <div className="space-y-6">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">

            {/* Tab bar + Analyze button */}
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setActiveTab('raw')}
                  className={`px-4 py-1.5 text-[10px] font-mono rounded-md transition-all ${activeTab === 'raw' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  RAW HEADERS
                </button>
                <button onClick={() => setActiveTab('decoded')}
                  className={`px-4 py-1.5 text-[10px] font-mono rounded-md transition-all ${activeTab === 'decoded' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  DECODED
                </button>
              </div>
              <button onClick={runAnalysis} disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap">
                {isAnalyzing ? <Cpu className="w-3 h-3 animate-spin" /> : <FileSearch className="w-3 h-3" />}
                {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
              </button>
            </div>

            <div className="p-5 min-h-[320px] overflow-y-auto custom-scrollbar relative">
              <AnimatePresence mode="wait">

                {activeTab === 'raw' ? (
                  <Motion.div key="raw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-0.5">
                    {rawLines.map((line, i) => {
                      const spot = getLineHotspot(line);
                      const isHighlighted = showFindings && spot;
                      const isActive = isHighlighted && activeHotspot?.id === spot.id;
                      return (
                        // Highlighted lines become clickable beacons after analysis runs
                        <div key={i} className={`relative group transition-all duration-200 ${isHighlighted ? 'cursor-pointer' : ''}`}
                          onClick={() => isHighlighted && toggleHotspot(spot)}>
                          <pre className={`text-[11px] font-mono whitespace-pre-wrap leading-relaxed px-3 py-1 rounded-lg ${isActive ? colorMap[spot.color].hl :
                              isHighlighted ? `${colorMap[spot.color].hl} opacity-80` :
                                'text-slate-400'
                            }`}>
                            {line.text}
                          </pre>
                          {/* Badge number appears on the right edge of each flagged line */}
                          {isHighlighted && (
                            <span className={`absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${colorMap[spot.color].dot} text-white text-[9px] font-black flex items-center justify-center shadow ${!isActive ? 'animate-pulse' : ''}`}>
                              {spot.label}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {!showFindings && (
                      <p className="text-slate-700 italic text-[10px] pt-4">Click "Run Analysis" to highlight forensic red flags...</p>
                    )}
                  </Motion.div>
                ) : (
                  // Decoded view: structured table showing the key spoofing fields
                  <Motion.div key="decoded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Decoded Fields</span>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                      <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-400">Field</div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-400 col-span-2">Value</div>
                      <div className="p-2 border border-slate-800 text-emerald-500">From</div>
                      <div className="p-2 border border-slate-800 text-slate-300 col-span-2">support@microsoft.com</div>
                      <div className="p-2 border border-slate-800 text-rose-500">Return-Path</div>
                      <div className="p-2 border border-slate-800 text-rose-400 col-span-2 break-all">bounce-back@marketing-tracker-server.ru</div>
                      <div className="p-2 border border-slate-800 text-amber-500">Origin IP</div>
                      <div className="p-2 border border-slate-800 text-amber-300 col-span-2">185.122.1.42 (Eastern Europe)</div>
                      <div className="p-2 border border-slate-800 text-rose-500">SPF</div>
                      <div className="p-2 border border-slate-800 text-rose-400 col-span-2">FAIL — unauthorized sender</div>
                      <div className="p-2 border border-slate-800 text-rose-500">DMARC</div>
                      <div className="p-2 border border-slate-800 text-rose-400 col-span-2">FAIL — policy: reject</div>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>

              {/* Full-screen loading overlay during the simulated analysis scan */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 rounded-3xl">
                  <Cpu className="w-10 h-10 text-emerald-500 animate-pulse" />
                  <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <Motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.2 }} className="h-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] font-mono text-emerald-500 animate-pulse uppercase tracking-widest">Parsing metadata...</p>
                </div>
              )}
            </div>
          </div>

          {/* Active hotspot detail card — positioned below the terminal */}
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

          {/* Forensic conclusion card — shown after the analysis completes */}
          <AnimatePresence>
            {showFindings && (
              <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="p-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-500/30 shadow-2xl">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-7 h-7 text-rose-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Identity Spoofing Detected</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Appears to be from <strong>Microsoft Support</strong> but actually originated from a Russian marketing server at <strong>marketing-tracker-server.ru</strong> (IP: 185.122.1.42). SPF and DMARC checks both failed.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">HIGH CONFIDENCE SPOOF</span>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-rose-500" /> SPF FAILED
                      </span>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-rose-500" /> DMARC FAILED
                      </span>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
