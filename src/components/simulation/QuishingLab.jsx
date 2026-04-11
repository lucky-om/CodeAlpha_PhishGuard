import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShieldCheck, ShieldAlert, Scan, ExternalLink, Info } from 'lucide-react';

export default function QuishingLab() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const mockScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        url: 'http://secure-login.bank-auth-verify.com/update',
        actualDomain: 'bank-auth-verify.com',
        isPhish: true,
        tactic: 'Quishing (QR Phishing)',
        description: 'Attackers print fake QR codes and paste them over legitimate ones at restaurants, parking meters, or utility bills to redirect you to credential harvesting sites.'
      });
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase">
           Security Lab: QR Analysis
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
           <QrCode className="w-8 h-8 text-cyan-500" />
           The "Quishing" Threat
        </h3>
        <p className="text-slate-500 leading-relaxed text-lg">
           QR Codes are convenient but inherently opaque. Attackers rely on the fact that most people won't inspect the destination URL when scanning a code in a hurry.
        </p>
        
        <div className="space-y-4">
           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-5 h-5 text-cyan-500" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                 <strong>Safe Practice:</strong> Always use a scanner app that provides a "Preview" of the URL before opening it.
              </p>
           </div>
           
           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                 <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                 <strong>Red Flag:</strong> Be wary of QR codes that look like stickers pasted over original signage.
              </p>
           </div>
        </div>
      </div>

      {/* Interactive Scanner */}
      <div className="flex justify-center relative">
        <div className="relative group">
           {/* QR Code Background */}
           <div className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-slate-100 relative overflow-hidden">
               <img 
                 src="/sample_phishing_qr_1775843127186.png" 
                 alt="QR Code" 
                 className="w-48 h-48 opacity-80"
               />
               
               {/* Animated Scanner Line */}
               {isScanning && (
                 <Motion.div 
                   initial={{ top: 0 }}
                   animate={{ top: '100%' }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)] z-10"
                 />
               )}
           </div>

           {/* Scanner Overlay / Button */}
           <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
              <button 
                onClick={mockScan}
                disabled={isScanning}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-2xl disabled:opacity-50"
              >
                {isScanning ? <Scan className="w-5 h-5 animate-spin" /> : <Scan className="w-5 h-5" />}
                {isScanning ? 'Scanning...' : 'Scan QR Code'}
              </button>
           </div>
        </div>

        {/* Floating Scan Result Panel */}
        <AnimatePresence>
          {scanResult && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute -bottom-10 -right-4 lg:-right-10 w-80 p-6 bg-white dark:bg-slate-900 border-2 border-rose-500/50 rounded-3xl shadow-3xl z-30"
            >
               <div className="flex items-center gap-2 text-rose-500 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">{scanResult.tactic} Detected</span>
               </div>
               
               <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl mb-4 font-mono text-xs break-all border dark:border-slate-800">
                  <span className="text-slate-500">Destination:</span>
                  <p className="text-rose-600 dark:text-rose-400 mt-1 font-bold">{scanResult.url}</p>
               </div>

               <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {scanResult.description}
               </p>

               <div className="flex gap-2">
                  <div className="flex-1 py-2 px-3 bg-rose-500 text-white rounded-lg text-center text-[10px] font-bold">
                     MALICIOUS
                  </div>
                  <div className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg text-center text-[10px] flex items-center justify-center gap-1">
                     <ExternalLink className="w-3 h-3" /> OPEN
                  </div>
               </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
