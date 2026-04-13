/* coded by lucky */
import QuizBoard from '../components/quiz/QuizBoard';
import { motion as Motion } from 'framer-motion';

export default function Quiz() {

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
          Phishing IQ Assessment
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Prove your readiness. This 10-question evaluation will test your ability to spot advanced threats across email, SMS, and web domains.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <QuizBoard />
      </div>

      <div className="text-center pt-10">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Secured Assessment Module // Coded by Lucky
        </p>
      </div>
    </Motion.div>
  );
}
