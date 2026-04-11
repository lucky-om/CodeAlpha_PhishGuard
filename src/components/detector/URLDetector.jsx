import { useState } from 'react';
import { analyzeUrl } from '../../utils/detectorLogic';
import { Search, ShieldAlert, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function URLDetector() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const { markSectionComplete } = useGame();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    // Process analytics
    const result = analyzeUrl(url);
    setReport(result);
    markSectionComplete('detector', 20); // Award points on first analysis
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'High': return <ShieldAlert className="w-8 h-8" />;
      case 'Medium': return <AlertTriangle className="w-8 h-8" />;
      case 'Low': return <ShieldCheck className="w-8 h-8" />;
      default: return <Info className="w-8 h-8" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Input Section */}
      <form onSubmit={handleAnalyze} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste suspicious URL here... (e.g. login.secure.paypa1.update.com)"
          className="block w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-0 focus:border-cyan-500 transition-colors text-lg shadow-sm"
        />
        <button
          type="submit"
          className="absolute inset-y-2 right-2 px-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-all disabled:opacity-50"
          disabled={!url.trim()}
        >
          Analyze
        </button>
      </form>

      {/* Report Section */}
      {report && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className={`p-6 border-b flex items-center justify-between ${getRiskColor(report.riskLevel)}`}>
            <div className="flex items-center gap-4">
              {getRiskIcon(report.riskLevel)}
              <div>
                <h3 className="text-xl font-bold">Threat Level: {report.riskLevel}</h3>
                <p className="text-sm opacity-80">Score: {report.riskScore}/10</p>
              </div>
            </div>
            {report.riskLevel === 'Low' && (
              <span className="font-mono text-sm uppercase tracking-wider">Safe</span>
            )}
          </div>
          
          <div className="p-6">
            <h4 className="font-bold mb-4 text-slate-700 dark:text-slate-300">Detailed Analysis Flags:</h4>
            <ul className="space-y-3">
              {report.flags.map((flag, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  {flag.type === 'critical' && <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
                  {flag.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />}
                  {flag.type === 'success' && <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                  <span className={`${
                    flag.type === 'critical' ? 'text-rose-600 dark:text-rose-400 font-medium' :
                    flag.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {flag.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
