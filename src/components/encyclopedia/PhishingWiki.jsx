/* coded by lucky */
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Target, Fish, ShieldAlert, Laptop, PhoneForwarded, 
  History, AlertCircle, QrCode, MessageSquare, Search, Share2, Mail
} from 'lucide-react';

const phishingTypes = [
  {
    id: 'phishing',
    title: 'Email Phishing',
    icon: <Mail className="w-6 h-6" />,
    desc: 'The most common form of phishing. Attackers send bulk emails masquerading as a trusted entity (Bank, UPS, Netflix) to steal credentials or deliver malware.',
    impact: '2023 Google/Facebook Fraud — A scammer used fake invoices to trick both companies into paying over $100M.',
    realWorld: 'An email from "Netflix Support" claiming your payment failed and providing a link to "Update Payment Method."'
  },
  {
    id: 'spear',
    title: 'Spear Phishing',
    icon: <Target className="w-6 h-6" />,
    desc: 'Targeted attacks aimed at a specific individual or organization. Attackers research their victims on social media to craft highly personalized messages.',
    impact: '2023 MGM Resorts Breach — A spear-phishing attack via LinkedIn led to nearly $100M in losses.',
    realWorld: 'A hacker poses as a colleague, referencing a specific project you are working on to gain trust.'
  },
  {
    id: 'smishing',
    title: 'Smishing (SMS)',
    icon: <MessageSquare className="w-6 h-6" />,
    desc: 'Phishing via SMS text messages. Often uses urgent language about package deliveries, bank alerts, or government tax rebates.',
    impact: '2022 Twilio Breach — Employees were tricked by SMS messages into giving up their corporate credentials.',
    realWorld: 'A text message: "[USPS] Your package is on hold due to a missing house number. Please update here: usps-delivery.info."'
  },
  {
    id: 'quishing',
    title: 'Qushing (QR Code)',
    icon: <QrCode className="w-6 h-6" />,
    desc: 'Using malicious QR codes to redirect victims to phishing sites. Often found in public places like parking meters, restaurants, or fake physical mail.',
    impact: 'Standard Chartered QR Scam — Victims scanned QR codes on fake letters to "update details", losing thousands.',
    realWorld: 'A QR code on a parking meter that leads to a fake payment portal instead of the official city app.'
  },
  {
    id: 'vishing',
    title: 'Vishing (Voice)',
    icon: <PhoneForwarded className="w-6 h-6" />,
    desc: 'Using phone calls or VoIP to trick users into sharing data. Often involves "robocalls" or AI-generated voices impersonating bank agents.',
    impact: '2020 Twitter Hack — Attackers vished employees to gain administrative tool access, compromising high-profile accounts.',
    realWorld: 'A call from "Apple Support" claiming your iCloud is hacked and asking for your password to "secure" it.'
  },
  {
    id: 'angler',
    title: 'Angler Phishing',
    icon: <Share2 className="w-6 h-6" />,
    desc: 'Attackers create fake social media accounts impersonating a brand\'s customer service. They "angle" for victims by replying to public complaints.',
    impact: 'Common in Crypto — Fake "Metamask Support" accounts on X (Twitter) frequently steal wallet seed phrases.',
    realWorld: 'You tweet at a bank about an app bug, and a fake "Bank Help" account replies asking for your login info to "fix" it.'
  },
  {
    id: 'seo',
    title: 'Search Phishing',
    icon: <Search className="w-6 h-6" />,
    desc: 'Also known as SEO Phishing. Attackers use "black hat" SEO techniques to make their phishing sites appear at the top of search results for specific keywords.',
    impact: 'GIMP Software Scam — A malicious clone of the GIMP website was promoted via Google Ads to distribute malware.',
    realWorld: 'Searching for "Download Zoom" and clicking the first (ad) result, which leads to zoom-install.net instead of zoom.us.'
  },
  {
    id: 'whaling',
    title: 'Whaling',
    icon: <Fish className="w-6 h-6 rotate-180" />,
    desc: 'A form of spear-phishing aiming specifically at "Big Fish"—CEOs, CFOs, and top executives with high-level access.',
    impact: 'FACC Aviation Fraud — A "Fake President" email cost the company over $50 million.',
    realWorld: 'An email sent to a CFO, appearing to be from the CEO, requesting an urgent wire transfer for a "confidential acquisition."'
  }
];

export default function PhishingWiki() {
  const [selected, setSelected] = useState(phishingTypes[0]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl mb-8">
             <div className="flex items-center gap-2 text-cyan-500 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Knowledge Base</span>
             </div>
             <p className="text-xs text-slate-500">Select a category to explore tactics, technical details, and historical data breaches.</p>
          </div>
          
          <div className="space-y-2">
            {phishingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelected(type)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  selected.id === type.id 
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20 translate-x-1' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`${selected.id === type.id ? 'text-white' : 'text-cyan-500'}`}>
                   {type.icon}
                </div>
                <span className="font-bold">{type.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              <Motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 lg:p-12 shadow-2xl space-y-8"
              >
                 <div className="space-y-4">
                    <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-4">
                       <span className="text-cyan-500">{selected.icon}</span>
                       {selected.title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                       {selected.desc}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4">
                       <div className="flex items-center gap-3 text-rose-500 font-bold uppercase tracking-widest text-xs">
                          <History className="w-4 h-4" /> Real-World Impact
                       </div>
                       <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">
                          {selected.impact}
                       </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                       <div className="flex items-center gap-3 text-emerald-500 font-bold uppercase tracking-widest text-xs">
                          <AlertCircle className="w-4 h-4" /> Identification
                       </div>
                       <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          "{selected.realWorld}"
                       </p>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Defense Strategy</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                       <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-mono">Anti-Spoofing</span>
                       <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-mono">DMARC/SPF</span>
                       <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-mono">MFA Enforcement</span>
                       <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-mono">SAT Training</span>
                    </div>
                 </div>
              </Motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
