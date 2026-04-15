// Coded by Lucky

import PhishingWiki from '../components/encyclopedia/PhishingWiki';
import { motion as Motion } from 'framer-motion';

export default function Encyclopedia() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          The Phishing Encyclopedia
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Deep-dive into the technical and psychological mechanics of social engineering. Learn from historical breaches to understand the real-world impact of these threats.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <PhishingWiki />
      </div>
    </Motion.div>
  );
}
