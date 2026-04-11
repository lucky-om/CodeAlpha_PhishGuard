/* coded by lucky */
import { motion as Motion } from 'framer-motion';
import { Book, Shield, Terminal, Mail, Info, FileText, Lock, Globe, AlertTriangle } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      title: 'Platform Overview',
      icon: <Info className="w-6 h-6 text-cyan-500" />,
      content: 'PhishGuard is an advanced cybersecurity awareness platform designed to educate users on the latest social engineering threats. It combines interactive simulations with real-time analysis tools to provide a hands-on learning experience.'
    },
    {
      title: 'AI Link Analyzer',
      icon: <Terminal className="w-6 h-6 text-cyan-500" />,
      content: 'The analyzer uses heuristic patterns to identify malicious URL structures. It checks for typosquatting, homograph attacks (visual deception), and insecure connection protocols.'
    },
    {
      title: 'Simulation Lab',
      icon: <Mail className="w-6 h-6 text-cyan-500" />,
      content: 'The simulation lab provides high-fidelity clones of common phishing attacks across various vectors including Web, Email, and SMS (Smishing).'
    },
    {
      title: 'Threat Encyclopedia',
      icon: <Book className="w-6 h-6 text-cyan-500" />,
      content: 'A comprehensive knowledge base covering modern attack vectors like Qushing (QR code phishing) and Angler Phishing (social media impersonation).'
    }
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-12 pb-20 mt-10"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Platform Documentation</h1>
        <p className="text-slate-500">Master the tools and concepts of PhishGuard Intel.</p>
      </div>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex gap-6">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              {section.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-3xl space-y-4">
        <h3 className="text-xl font-bold text-rose-500 flex items-center gap-2">
           <AlertTriangle className="w-5 h-5" /> Security Warning
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono italic">
          ACT AS SECURE CODING PERSON: All simulations within this platform are strictly for educational purposes. Never enter real sensitive information into the simulation demos. PhishGuard does not store any input data from the Link Analyzer.
        </p>
        <p className="text-xs text-slate-400 italic">— Coded by Lucky</p>
      </div>
    </Motion.div>
  );
}
