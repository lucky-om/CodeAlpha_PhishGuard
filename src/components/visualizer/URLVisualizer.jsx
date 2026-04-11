import { useState, useEffect } from 'react';
import PsychologyCards from './PsychologyCards';
import { Eye, ExternalLink, CheckCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const demoLinks = [
  {
    id: 'paypa1',
    displayText: 'secure-login.paypal.com',
    targetUrl: 'https://secure-login.paypa1-update.com/login',
    realUrl: 'https://www.paypal.com',
    type: 'Typosquatting'
  },
  {
    id: 'google',
    displayText: 'Reset your Google Password',
    targetUrl: 'http://google.password-reset-auth.net/v1',
    realUrl: 'https://myaccount.google.com',
    type: 'Subdomain Abuse'
  }
];

export default function URLVisualizer() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [analyzed, setAnalyzed] = useState([]);
  const { markSectionComplete } = useGame();

  useEffect(() => {
    if (analyzed.length === demoLinks.length) {
      markSectionComplete('visualizer', 10);
    }
  }, [analyzed, markSectionComplete]);

  const handleHover = (link) => {
    setHoveredLink(link);
    if (!analyzed.includes(link.id)) {
      setAnalyzed(prev => [...prev, link.id]);
    }
  };

  return (
    <div>
      <PsychologyCards />
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg relative overflow-hidden">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6 text-cyan-500" />
          The "Hover to Inspect" Technique
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
          One of the simplest ways to defeat a phishing attack is to inspect a link before clicking it. On a desktop, hover your mouse over the buttons below to see where they really go. Look at the bottom left of this "browser" window to see the fake status bar.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-12 bg-slate-100 dark:bg-slate-950 rounded-xl relative border border-slate-200 dark:border-slate-800">
          {demoLinks.map(link => (
            <button
              key={link.id}
              onMouseEnter={() => handleHover(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors cursor-pointer relative"
            >
              {link.displayText}
              <ExternalLink className="w-4 h-4" />
              {analyzed.includes(link.id) && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}
            </button>
          ))}

          {/* Simulated Browser Status Bar */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-200 dark:bg-slate-800 flex items-center px-4 rounded-b-xl border-t border-slate-300 dark:border-slate-700 transition-opacity duration-300">
            {hoveredLink ? (
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                <span className="text-rose-600 dark:text-rose-400 font-bold">{hoveredLink.targetUrl}</span>
              </span>
            ) : (
              <span className="text-xs font-mono text-slate-500 italic">Hover over a link to view destination...</span>
            )}
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className={`mt-8 transition-all duration-500 ${hoveredLink ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {hoveredLink && (
            <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-4 text-cyan-600 dark:text-cyan-400">Analysis: {hoveredLink.type}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <span className="text-slate-500 block mb-1">What the attacker shows:</span>
                  <div className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200">
                    {hoveredLink.displayText}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Where it actually goes:</span>
                  <div className="p-2 bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900 rounded text-rose-700 dark:text-rose-400 break-all">
                    {hoveredLink.targetUrl}
                  </div>
                </div>
                <div className="md:col-span-2 mt-2">
                  <span className="text-slate-500 block mb-1">The REAL URL should be:</span>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 rounded text-emerald-700 dark:text-emerald-400">
                    {hoveredLink.realUrl}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
