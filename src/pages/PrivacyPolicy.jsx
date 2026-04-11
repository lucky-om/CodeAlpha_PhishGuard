/* coded by lucky */
import { motion as Motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  const points = [
    {
      title: 'Data Collection',
      icon: <Eye className="w-6 h-6 text-emerald-500" />,
      text: 'PhishGuard does not collect or store any personal data. This is a static educational platform. Any URLs entered into the Link Analyzer are processed locally in your browser.'
    },
    {
      title: 'Cookies & Tracking',
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      text: 'We do not use tracking cookies, analytics, or third-party marketing scripts.'
    },
    {
      title: 'Secure Local Storage',
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      text: 'Your simulation progress (score) is stored locally in your browser\'s localStorage and never transmitted to our servers.'
    },
    {
      title: 'External Resource Links',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      text: 'This platform may link to official cybersecurity resources (like OWASP). Once you leave PhishGuard, their respective privacy policies apply.'
    }
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 pb-20 mt-10"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500 italic">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-3 mb-8 text-emerald-500 font-bold uppercase tracking-widest text-sm">
           <FileText className="w-5 h-5" /> Standard Academic Policy
        </div>
        
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-12">
          This platform is designed as an educational tool for cybersecurity awareness. We are committed to maintaining a zero-footprint privacy stance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {points.map((point, i) => (
             <div key={i} className="space-y-4">
                <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white">
                   {point.icon}
                   {point.title}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">{point.text}</p>
             </div>
           ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
           <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
              All Rights Reserved 2026 // Coded by Lucky
           </p>
        </div>
      </div>
    </Motion.div>
  );
}
