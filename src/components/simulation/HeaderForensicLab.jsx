import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FileSearch, ArrowRight, ShieldAlert, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function HeaderForensicLab() {
  const [activeTab, setActiveTab] = useState('raw');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFindings, setShowFindings] = useState(false);

  const rawHeaders = `Delivered-To: user@example.com
Received: by 2002:a05:620a:208b:b0:78a:5c2a:13d with SMTP id d11csp1028753qkh;
        Tue, 24 Dec 2024 02:45:12 -0800 (PST)
X-Google-Smtp-Source: AGHT+IFeUj/6W9U0J9pS5Ld8sB9tZ2g==
Return-Path: <bounce-back@marketing-tracker-server.ru>
Received: from mx-out.mail-gateway.ru (mx-out.mail-gateway.ru. [185.122.1.42])
        by mx.google.com with ESMTPS id o18si12740447pgn.512.2024.12.24.02.45.11
        for <user@example.com>
From: "Microsoft Support" <support@microsoft.com>
Subject: Security Alert: Your Account was accessed from a new device`;

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setShowFindings(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFindings(true);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase">
             Forensic Level: Advanced
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             <FileSearch className="w-8 h-8 text-emerald-500" />
             Header Forensic Lab
          </h3>
          <p className="text-slate-500 leading-relaxed">
             Attackers can easily "spoof" the visible **From** address in an email. This tool lets you look under the hood to see the actual path an email took across the internet.
          </p>
          
          <div className="space-y-4 pt-4">
             <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-yellow-500" />
                   The Shadow Header (Return-Path)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                   Real senders usually have a matching `From` and `Return-Path`. If the `Return-Path` points to an unknown server or a different domain entirely, it's a massive red flag.
                </p>
             </div>
          </div>
        </div>

        {/* Forensic Workstation */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex bg-slate-800 rounded-lg p-1">
               <button 
                  onClick={() => setActiveTab('raw')}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded-md transition-all ${activeTab === 'raw' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  RAW HEADERS
               </button>
               <button 
                  onClick={() => setActiveTab('analysis')}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded-md transition-all ${activeTab === 'analysis' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  DECRYPTED
               </button>
            </div>
            <button 
               onClick={runAnalysis}
               disabled={isAnalyzing}
               className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg transition-all disabled:opacity-50"
            >
               {isAnalyzing ? <Cpu className="w-3 h-3 animate-spin" /> : <FileSearch className="w-3 h-3" />}
               {isAnalyzing ? 'RUNNING FORENSICS...' : 'ANALYZE HEADERS'}
            </button>
          </div>

          <div className="p-6 h-[300px] overflow-y-auto custom-scrollbar relative">
             <AnimatePresence mode="wait">
                {activeTab === 'raw' ? (
                   <Motion.pre 
                      key="raw"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed"
                   >
                      {rawHeaders}
                   </Motion.pre>
                ) : (
                   <Motion.div 
                      key="decrypted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                   >
                      <div className="space-y-2">
                         <span className="text-[10px] text-slate-500 font-mono uppercase">Decoded Fields</span>
                         <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                            <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-400">Field</div>
                            <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-400 col-span-2">Value</div>
                            
                            <div className="p-2 border border-slate-800 text-emerald-500">From</div>
                            <div className="p-2 border border-slate-800 text-slate-300 col-span-2">support@microsoft.com</div>
                            
                            <div className="p-2 border border-slate-800 text-rose-500">Return-Path</div>
                            <div className="p-2 border border-slate-800 text-rose-400 col-span-2">bounce-back@marketing-tracker-server.ru</div>

                            <div className="p-2 border border-slate-800 text-slate-500">Origin IP</div>
                            <div className="p-2 border border-slate-800 text-slate-300 col-span-2">185.122.1.42 (Russia)</div>
                         </div>
                      </div>
                   </Motion.div>
                )}
             </AnimatePresence>

             {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                   <Cpu className="w-10 h-10 text-emerald-500 animate-pulse" />
                   <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <Motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '100%' }}
                         transition={{ duration: 2 }}
                         className="h-full bg-emerald-500"
                      />
                   </div>
                   <p className="text-[10px] font-mono text-emerald-500 animate-pulse uppercase tracking-widest">Scanning MetaData...</p>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Analysis Finding Section */}
      <AnimatePresence>
         {showFindings && (
            <Motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-500/30 shadow-2xl"
            >
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
                     <ShieldAlert className="w-10 h-10 text-rose-500" />
                  </div>
                  <div className="space-y-2 flex-1">
                     <h4 className="text-xl font-bold text-slate-900 dark:text-white">Forensic Finding: Identity Spoofing Detected</h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The email claims to be from <strong>Microsoft Support</strong>, but the forensic analysis shows the message actually originated from a Russian marketing server <strong>(marketing-tracker-server.ru)</strong>. 
                     </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                     <div className="px-4 py-2 bg-rose-500 text-white rounded-xl text-center font-bold text-xs">
                        HIGH CONFIDENCE SPOOF
                     </div>
                     <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl text-center text-xs flex items-center justify-center gap-2 italic">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> SPF FAILED
                     </div>
                  </div>
               </div>
            </Motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
