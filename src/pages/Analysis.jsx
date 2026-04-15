// Coded by Lucky
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { analyzeUrl, decodeUrl, TLD_MAP } from '../utils/detectorLogic';
import { sanitizeUrl, sanitizeText } from '../utils/sanitize';
import {
  Search, ShieldAlert, AlertTriangle, ShieldCheck, Info, Terminal as TerminalIcon,
  Loader2, Bug, Lock, Copy, CheckCheck, ExternalLink, Zap, ChevronDown,
  Layers, Unlock, History, Users, Globe2, Share2, X, Trash2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';


const EXAMPLE_URLS = [
  'paypal-secure-login.xyz',
  'amazon-billing-update.info/verify',
  'https://rnicrosoft-account.top/login',
  'bit.ly/urgent-bank-alert',
  'xn--pypl-p9a.com',
  'login.secure.random-site.tk',
  'paypal.com.xyz/account',
  'google.com',
];

const ATTACK_CATEGORIES = {
  'Brand Spoofing': 'Attackers register domains that look like trusted brands (e.g., "paypa1.com" or "rnicrosoft.com") to steal credentials.',
  'Hidden Destination': 'URL shorteners hide the real destination. Clicking is like opening a mystery box — you never know where you land.',
  'Raw IP Address': 'Legitimate services always use domain names, never raw IP addresses. This is a hallmark of phishing kits.',
  'URL Obfuscation': 'The "@" symbol tricks browsers — everything before it is ignored. The real host is what comes after.',
  'Homograph Attack': 'Unicode characters that look identical to Latin letters are used to create visually indistinguishable fake domains.',
  'Typosquatting': 'Domains with many hyphens often impersonate brands (e.g., "secure-login-paypal-update.com").',
  'Subdomain Abuse': 'Deep subdomain chains mask the real domain — your target is the rightmost non-TLD part.',
  'Mixed TLD': '"paypal.com.xyz" — users read the "paypal.com" part and miss the malicious ".xyz" at the end.',
  'Suspicious TLD': 'Certain TLDs like .tk, .xyz, and .zip are cheap or free, making them attractive for throwaway phishing campaigns.',
  'Fake Portal Subdomain': '"login.randomsite.xyz" uses a trusted-sounding subdomain to impersonate a login portal.',
  'Open Redirect': 'Open redirects chain victims through a legitimate-looking URL before bouncing them to a malicious page.',
  'Free Hosting Abuse': 'Free platforms are used because they require no identity — easy to spin up, hard to trace.',
  'No Encryption': 'HTTP transmits everything in plaintext. Any data you enter is visible to anyone on the network.',
  'Suspicious Path': '"/login", "/verify" paths on random domains signal credential harvesting pages.',
  'DGA Detection': 'Domain Generation Algorithms create random-looking domains for malware — high entropy and length are indicators.',
  'Leetspeak': 'Number-for-letter swaps (paypa1, g00gle) are invisible at speed but fool text-based security filters.',
  'Port Anomaly': 'Non-standard ports (not 80/443) often indicate a rogue server bypassing firewall rules.',
  'Code Injection': 'javascript: and data: URIs can execute code when clicked — never trust them.',
};

const COMMUNITY_VERDICTS = [
  { label: 'Malicious', color: 'rose' },
  { label: 'Suspicious', color: 'yellow' },
  { label: 'Clean', color: 'emerald' },
];



function RiskGauge({ score }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, [score]);

  const r = 50;
  const circ = Math.PI * r;
  const pct = animated ? score / 10 : 0;
  const offset = circ * (1 - pct);
  const color = score >= 7 ? '#f43f5e' : score >= 4 ? '#f59e0b' : '#10b981';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 120 72" className="w-36 h-24" aria-label={`Risk score ${score} out of 10`}>
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 10 65 A 50 50 0 0 1 110 65"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease' }}
        />
        <text x="60" y="55" textAnchor="middle" fill="currentColor" fontSize="22" fontWeight="900" fontFamily="monospace">{score}</text>
        <text x="60" y="68" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">/10</text>
      </svg>
      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
        {score >= 7 ? 'HIGH RISK' : score >= 4 ? 'MEDIUM RISK' : score === 0 ? 'SAFE' : 'LOW RISK'}
      </span>
    </div>
  );
}

function CommunityVerdict({ score }) {
  const malicious = Math.min(95, Math.max(5, score >= 7 ? 70 + score * 3 : score >= 4 ? 30 + score * 5 : score * 4));
  const clean = Math.max(5, 100 - malicious - 10);
  const suspicious = 100 - malicious - clean;
  const bars = [
    { label: 'Malicious', pct: malicious, color: 'bg-rose-500' },
    { label: 'Suspicious', pct: suspicious, color: 'bg-yellow-500' },
    { label: 'Clean', pct: clean, color: 'bg-emerald-500' },
  ];
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
      <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
        <Users className="w-3 h-3" /> Community Verdict (Simulated)
      </div>
      {bars.map(b => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="text-[9px] text-slate-500 w-16 font-bold">{b.label}</span>
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${b.color} rounded-full transition-all duration-1000`} style={{ width: `${b.pct}%` }} />
          </div>
          <span className="text-[9px] text-slate-400 font-mono w-8 text-right">{Math.round(b.pct)}%</span>
        </div>
      ))}
    </div>
  );
}

function DomainRepCard({ domain }) {
  if (!domain) return null;
  const tld = domain.split('.').pop().toLowerCase();
  const info = TLD_MAP[tld];
  if (!info) return null;

  const riskColors = {
    critical: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    high: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
      <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
        <Globe2 className="w-3 h-3" /> Domain Reputation
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{info.flag}</span>
          <div>
            <p className="text-xs font-black text-white">.{tld}</p>
            <p className="text-[9px] text-slate-500">{info.name}</p>
          </div>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${riskColors[info.risk]}`}>
          {info.risk} trust
        </span>
      </div>
      {info.note && <p className="text-[10px] text-slate-500 leading-relaxed">{info.note}</p>}
    </div>
  );
}

function FlagCard({ flag }) {
  const [open, setOpen] = useState(false);
  const explanation = ATTACK_CATEGORIES[flag.category];
  return (
    <li className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-cyan-500/30 transition-all">
      <div className="flex gap-3 items-start">
        {flag.type === 'critical' ? <ShieldAlert className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" /> :
          flag.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" /> :
            <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm leading-tight ${flag.type === 'critical' ? 'text-rose-600 dark:text-rose-400' :
            flag.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {flag.message}
          </p>
          {flag.category && (
            <button
              onClick={() => setOpen(v => !v)}
              className="mt-1.5 flex items-center gap-1 text-[9px] font-black text-slate-500 hover:text-cyan-500 transition-colors uppercase tracking-widest"
            >
              <Info className="w-3 h-3" /> What is {flag.category}?
              <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {open && explanation && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-[10px] text-slate-500 leading-relaxed pl-8 border-l-2 border-cyan-500/30 ml-2">{explanation}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function BeginnerReport({ riskLevel, flags }) {
  const verdict = riskLevel === 'High'
    ? {
      emoji: '🚨',
      text: 'Danger! Do NOT visit this link.',
      sub: 'This URL has multiple serious red flags consistent with phishing attacks.',
      boxClass: 'bg-rose-500/10 border-rose-500/20',
      textClass: 'text-rose-500'
    }
    : riskLevel === 'Medium'
      ? {
        emoji: '⚠️',
        text: 'Be Careful — Exercise Caution.',
        sub: 'This link has some suspicious characteristics. Verify before proceeding.',
        boxClass: 'bg-yellow-500/10 border-yellow-500/20',
        textClass: 'text-yellow-500'
      }
      : riskLevel === 'Invalid'
        ? {
          emoji: '❓',
          text: 'Invalid Input.',
          sub: 'Please enter a valid URL or domain name.',
          boxClass: 'bg-slate-500/10 border-slate-500/20',
          textClass: 'text-slate-400'
        }
        : {
          emoji: '✅',
          text: 'Looks Safe — Proceed with Care.',
          sub: 'No obvious red flags found, but always verify manually before entering personal data.',
          boxClass: 'bg-emerald-500/10 border-emerald-500/20',
          textClass: 'text-emerald-500'
        };

  return (
    <div className="space-y-4">
      <div className={`p-6 rounded-2xl border text-center ${verdict.boxClass}`}>
        <div className="text-5xl mb-3">{verdict.emoji}</div>
        <h4 className={`text-lg font-black ${verdict.textClass}`}>{verdict.text}</h4>
        <p className="text-sm text-slate-400 mt-1">{verdict.sub}</p>
      </div>
      {flags.filter(f => f.type === 'critical').slice(0, 2).map((f, i) => (
        <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
          <span className="text-rose-500">⚠</span>
          <p className="text-xs text-slate-400">{f.message}</p>
        </div>
      ))}
    </div>
  );
}


export default function Analysis() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [report, setReport] = useState(null);
  const [analyzedDomain, setAnalyzedDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState('single');
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeResults, setDecodeResults] = useState(null);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('phishguard_history') || '[]'); } catch { return []; }
  });
  const [showHistory, setShowHistory] = useState(false);
  const consoleContainerRef = useRef(null);
  const inputRef = useRef(null);
  const { markSectionComplete } = useGame();

  // Auto-run if ?url= param present
  useEffect(() => {
    const preUrl = searchParams.get('url');
    if (preUrl) { setUrl(preUrl); runSimulation(preUrl); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcut: press "/" to focus input
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = useCallback((msg, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { time, msg, type }]);
  }, []);

  const saveToHistory = useCallback((target, result) => {
    const entry = { url: target, score: result.riskScore, level: result.riskLevel, time: Date.now() };
    setHistory(prev => {
      const updated = [entry, ...prev.filter(h => h.url !== target)].slice(0, 10);
      localStorage.setItem('phishguard_history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const runSimulation = useCallback(async (targetUrl) => {
    setIsAnalyzing(true);
    setReport(null);
    setLogs([]);
    setCopied(false);

    const domain = targetUrl.replace(/^https?:\/\//, '').split('/')[0].split('?')[0];
    setAnalyzedDomain(domain);

    const steps = [
      { msg: 'Checking domain structure...', type: 'sys' },
      { msg: `Target: ${targetUrl}`, type: 'bot' },
      { msg: 'Scanning for known phishing patterns...', type: 'bot' },
      { msg: 'Validating domain reputation...', type: 'sys' },
      { msg: 'Verifying URL paths and redirects...', type: 'sys' },
      { msg: 'Finalizing report...', type: 'sys' },
    ];

    for (const step of steps) {
      addLog(step.msg, step.type);
      await new Promise(r => setTimeout(r, Math.random() * 400 + 150));
    }

    const result = analyzeUrl(targetUrl);
    setReport(result);
    setIsAnalyzing(false);
    markSectionComplete('detector');
    addLog(`Audit complete. Threat Level: ${result.riskLevel} (${result.riskScore}/10)`, 'success');
    saveToHistory(targetUrl, result);
    // Note: setSearchParams intentionally NOT called here — it triggers App scroll-to-top.
    // Sharing is handled manually via the Share button.
  }, [addLog, markSectionComplete, saveToHistory]);

  const handleAnalyze = (e) => {
    e.preventDefault();
    const trimmed = sanitizeUrl(url);
    if (!trimmed) return;
    if (!trimmed.includes('.') || trimmed.length < 4) {
      addLog('Error: Input rejected. Provide a valid domain or URL.', 'bot');
      return;
    }
    runSimulation(trimmed);
  };

  const handleCopy = () => {
    if (!report) return;
    const text = [
      `PhishGuard Threat Report — ${url}`,
      `Risk Score: ${report.riskScore}/10 | Threat Level: ${report.riskLevel}`,
      '',
      'Findings:',
      ...report.flags.map(f => `[${f.type.toUpperCase()}] ${f.message}`),
      '',
      `Generated by PhishGuard v4.0.0 | phishguard.luckyverse.tech`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(url)}`;
    navigator.clipboard.writeText(shareUrl).then(() => { setCopiedShare(true); setTimeout(() => setCopiedShare(false), 2500); });
  };



  const handleDecode = () => {
    const clean = sanitizeText(decodeInput);
    if (!clean) return;
    setDecodeResults(decodeUrl(clean));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('phishguard_history');
  };

  const TABS = [
    { id: 'single', label: 'Single URL', icon: <Search className="w-4 h-4" /> },
    { id: 'decoder', label: 'URL Decoder', icon: <Unlock className="w-4 h-4" /> },
  ];

  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 pb-20">

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-mono font-bold uppercase">
          <Search className="w-3 h-3" /> Audit Tool
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Security Audit
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Inspect suspicious domains locally in your browser.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Mode Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1 w-max mx-auto min-w-full sm:min-w-0 sm:w-fit">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                ? 'bg-slate-800 text-cyan-400 shadow-md'
                : 'text-slate-500 hover:text-white'}`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* Single URL mode */}
          {activeTab === 'single' && (
            <Motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">

              {/* Input form */}
              <form onSubmit={handleAnalyze} className="relative group flex flex-col sm:block gap-3">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(sanitizeUrl(e.target.value))}
                    disabled={isAnalyzing}
                    placeholder="Enter URL to audit... press / to focus"
                    className="block w-full pl-14 sm:pl-16 pr-4 sm:pr-[280px] py-5 sm:py-6 bg-slate-950 border-2 border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all text-sm sm:text-base shadow-2xl outline-none disabled:opacity-50 font-mono"
                  />
                  <div className="hidden sm:flex absolute right-3 inset-y-3 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBeginnerMode(v => !v)}
                      title={beginnerMode ? 'Switch to Expert mode' : 'Switch to Beginner mode'}
                      className={`px-3 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${beginnerMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' : 'border-slate-800 text-slate-400 hover:text-cyan-500'}`}
                    >
                      {beginnerMode ? 'Beginner' : 'Expert'}
                    </button>
                    <button
                      type="submit"
                      disabled={isAnalyzing || !url.trim()}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1.5rem] font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                    >
                      {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                      {isAnalyzing ? 'Auditing...' : 'Run Audit'}
                    </button>
                  </div>
                </div>
                {/* Mobile buttons */}
                <div className="flex sm:hidden items-center justify-end gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={() => setBeginnerMode(v => !v)}
                    className={`flex-1 px-3 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border ${beginnerMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' : 'border-slate-800 text-slate-400'}`}
                  >
                    {beginnerMode ? 'Beginner Mode' : 'Expert Mode'}
                  </button>
                  <button
                    type="submit"
                    disabled={isAnalyzing || !url.trim()}
                    className="flex-[2] px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1.5rem] font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                  >
                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    {isAnalyzing ? 'Auditing...' : 'Run'}
                  </button>
                </div>
              </form>

              {/* Example URLs */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Try:</span>
                {EXAMPLE_URLS.map((ex) => (
                  <button key={ex} onClick={() => setUrl(ex)} disabled={isAnalyzing}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-cyan-500/10 hover:text-cyan-500 text-slate-600 dark:text-slate-400 text-[10px] font-mono border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-all disabled:opacity-40">
                    {ex}
                  </button>
                ))}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-16 sm:pt-0">

                {/* Terminal Console */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
                  <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="w-4 h-4 text-cyan-500" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] font-bold">Audit Live Logs</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60" />
                    </div>
                  </div>
                  <div ref={consoleContainerRef} className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar">
                    <AnimatePresence>
                      {logs.length === 0 && <p className="text-slate-700 italic">SECURE CONSOLE IDLE // AWAITING TARGET...</p>}
                      {logs.map((log, i) => (
                        <Motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          className="flex gap-3 border-l border-slate-800 pl-3">
                          <span className="text-slate-700 shrink-0">{log.time}</span>
                          <span className={`leading-relaxed ${log.type === 'sys' ? 'text-slate-500' :
                            log.type === 'bot' ? 'text-cyan-500 font-bold' :
                              log.type === 'success' ? 'text-emerald-500' : 'text-slate-300'}`}>
                            {log.type === 'bot' ? '>>> ' : '### '}{log.msg}
                          </span>
                        </Motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Report Panel */}
                <div className="relative min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {!report && !isAnalyzing ? (
                      <Motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/40 text-center min-h-[500px]">
                        <Bug className="w-16 h-16 text-white/5 mb-4" />
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Awaiting Target</p>
                        <p className="text-slate-400 text-xs mt-2">Enter a URL above and press Run Audit</p>
                        <p className="text-slate-600 text-[9px] mt-3 font-mono">Press / to focus input</p>
                      </Motion.div>
                    ) : isAnalyzing ? (
                      <Motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center space-y-4 min-h-[500px]">
                        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                        <p className="font-mono text-xs text-cyan-500 tracking-widest uppercase">Analyzing...</p>
                      </Motion.div>
                    ) : (
                      <Motion.div key="report" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">

                        {/* Report Header with Gauge */}
                        <div className={`p-6 border-b flex items-center justify-between ${report.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                          report.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            report.riskLevel === 'Invalid' ? 'bg-slate-500/10 text-slate-500 border-slate-500/20' :
                              'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                          <div className="flex items-center gap-4">
                            <RiskGauge score={report.riskScore} />
                            <div>
                              <h3 className="text-lg font-black uppercase tracking-tighter italic">
                                {report.riskLevel} Risk
                              </h3>
                              <p className="text-[9px] uppercase font-mono font-bold tracking-widest opacity-70">
                                {report.flags.length} Finding{report.flags.length !== 1 ? 's' : ''} Detected
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-5">
                          {/* Community Verdict + Domain Rep */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CommunityVerdict score={report.riskScore} />
                            <DomainRepCard domain={analyzedDomain} />
                          </div>

                          {/* Beginner / Expert toggle output */}
                          {beginnerMode ? (
                            <BeginnerReport riskLevel={report.riskLevel} flags={report.flags} />
                          ) : (
                            <div>
                              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-4 font-bold">
                                Detailed Findings
                              </h4>
                              <ul className="space-y-3">
                                {report.flags.map((flag, i) => <FlagCard key={i} flag={flag} />)}
                              </ul>
                            </div>
                          )}

                          {/* Advisory */}
                          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                            <div className="flex items-center gap-2 text-cyan-500 mb-2">
                              <Info className="w-4 h-4" />
                              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Security Advisory</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {report.riskLevel === 'High'
                                ? 'CRITICAL: Connection signatures strongly correlate with malicious credential harvesting. Do not proceed under any circumstances.'
                                : report.riskLevel === 'Medium'
                                  ? 'WARNING: Structural anomalies detected. This URL may be a zero-day or obscure phishing campaign targeting a specific user group.'
                                  : report.riskLevel === 'Invalid'
                                    ? 'INVALID INPUT: Please provide a valid domain or full URL (e.g., paypal.com or https://amazon.com).'
                                    : 'PASS: Heuristic verification complete. No structural threats found. Always verify the sender/source manually before entering personal data.'}
                            </p>
                          </div>
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Session History */}
              {history.length > 0 && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowHistory(v => !v)}
                    onKeyDown={(e) => e.key === 'Enter' && setShowHistory(v => !v)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                      <History className="w-4 h-4" /> Recent Scans ({history.length})
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); clearHistory(); }}
                        className="text-[9px] text-rose-500 font-bold flex items-center gap-1 hover:text-rose-400">
                        <Trash2 className="w-3 h-3" /> Clear
                      </button>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {showHistory && (
                      <Motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {history.map((h, i) => (
                            <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                              <button onClick={() => { setUrl(h.url); runSimulation(h.url); }}
                                className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors truncate max-w-[60%] text-left">
                                {h.url}
                              </button>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${h.level === 'High' ? 'text-rose-500 bg-rose-500/10' :
                                h.level === 'Medium' ? 'text-yellow-500 bg-yellow-500/10' : 'text-emerald-500 bg-emerald-500/10'}`}>
                                {h.level} {h.score}/10
                              </span>
                            </div>
                          ))}
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Motion.div>
          )}



          {/* URL decoder mode */}
          {activeTab === 'decoder' && (
            <Motion.div key="decoder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">URL Obfuscation Decoder</h3>
                  <p className="text-sm text-slate-500">Paste a suspicious URL to reveal hidden destinations, decode percent-encoding, Base64 parameters, and decompose all URL components.</p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={decodeInput}
                    onChange={e => setDecodeInput(sanitizeText(e.target.value))}
                    onKeyDown={e => e.key === 'Enter' && handleDecode()}
                    placeholder="https://bit.ly/3xAm%2Fple?redirect=aHR0cHM6Ly9waGlzaC5leGFtcGxl"
                    className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-5 py-4 text-sm font-mono text-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all pr-36"
                  />
                  <button onClick={handleDecode} disabled={!decodeInput.trim()}
                    className="absolute inset-y-3 right-3 px-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm disabled:opacity-50 transition-all flex items-center gap-2">
                    <Unlock className="w-4 h-4" /> Decode
                  </button>
                </div>
              </div>

              {decodeResults && (
                <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Decoded Layers</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {decodeResults.map((r, i) => (
                      <div key={i} className={`px-6 py-4 space-y-1 ${r.danger ? 'bg-rose-500/5' : ''}`}>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${r.danger ? 'text-rose-500' : 'text-cyan-500'}`}>{r.label}</p>
                        <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all leading-relaxed">{r.value}</p>
                      </div>
                    ))}
                  </div>
                </Motion.div>
              )}
            </Motion.div>
          )}

        </AnimatePresence>
      </div>
    </Motion.div>
  );
}
