// Coded by Lucky

import { useState } from 'react';
import { getShuffledQuestions } from '../../utils/quizData';
import { CheckCircle2, XCircle, ChevronRight, Award, RefreshCw } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// ── Confetti (Feature N) ──────────────────────────────────────────────────────
// Particle data is pre-generated at module level using a seeded deterministic
// function — avoids calling Math.random() during render (react-hooks/purity).
const CONFETTI_COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06d6a0', '#ffd166'];
const seeded = (s) => ((Math.sin(s + 1) * 43758.5453) % 1 + 1) % 1;
const CONFETTI_PARTICLES = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: `${seeded(i * 7) * 100}%`,
  delay: `${seeded(i * 3) * 1.5}s`,
  duration: `${2.5 + seeded(i * 11) * 2}s`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: `${4 + seeded(i * 5) * 6}px`,
  rotate: `${seeded(i * 13) * 360}deg`,
}));

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden" aria-hidden="true">
      {CONFETTI_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate})`,
            animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}


// ── QuizBoard ──────────────────────────────────────────────────────────────────
export default function QuizBoard() {
  const [questions, setQuestions] = useState(() => getShuffledQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { markSectionComplete } = useGame();

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentIndex].answer) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = currentIndex + 1 === questions.length
        ? (selectedOption === questions[currentIndex].answer ? scoreCount + 1 : scoreCount)
        : scoreCount;
      const accuracy = Math.round((finalScore / questions.length) * 100);
      setQuizFinished(true);
      markSectionComplete('quiz', Math.floor((finalScore / questions.length) * 50));
      if (accuracy === 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  const restartQuiz = () => {
    setQuestions(getShuffledQuestions());
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreCount(0);
    setQuizFinished(false);
    setShowConfetti(false);
  };

  if (questions.length === 0) return <div className="text-slate-500">Loading...</div>;

  // ── Results Screen ────────────────────────────────────────────────────────
  if (quizFinished) {
    const finalScore = scoreCount;
    const accuracy = Math.round((finalScore / questions.length) * 100);
    const passed = accuracy >= 80;
    const perfect = accuracy === 100;

    return (
      <>
        <Confetti active={showConfetti} />
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl mx-auto relative overflow-hidden"
        >
          {perfect && (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 pointer-events-none" />
          )}

          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto ${perfect ? 'bg-cyan-500/20 text-cyan-500' :
            passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
            <Award className="w-12 h-12" />
          </div>

          {perfect && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-black uppercase tracking-widest"
            >
              🎉 Perfect Score! Elite Threat Analyst
            </Motion.div>
          )}

          <h3 className="text-3xl font-extrabold mb-2 text-slate-800 dark:text-slate-100">
            {perfect ? 'Flawless Victory!' : 'Mission Complete'}
          </h3>

          <div className={`text-6xl font-mono font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r ${perfect ? 'from-cyan-500 to-emerald-500' :
            passed ? 'from-emerald-500 to-teal-500' : 'from-rose-500 to-orange-500'}`}>
            {accuracy}%
          </div>

          <p className="text-slate-500 text-sm mb-2">
            {finalScore} / {questions.length} correct answers
          </p>

          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md text-sm leading-relaxed">
            {perfect
              ? 'Outstanding. You identified every threat with precision. You are operating at elite analyst level.'
              : passed
                ? 'Excellent work! You have proven your ability to detect and neutralize advanced phishing threats.'
                : 'Review the Forensic Lab and Encyclopedia modules, then retake to improve your threat detection accuracy.'}
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <button onClick={restartQuiz}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold text-sm">
              <RefreshCw className="w-4 h-4" /> Retake Assessment
            </button>
          </div>
        </Motion.div>
      </>
    );
  }

  // ── Question Screen ───────────────────────────────────────────────────────
  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.answer;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-4 text-sm font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${currentQ.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
            currentQ.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
              'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
            {currentQ.difficulty}
          </span>
        </div>
        <span className="text-slate-500">
          Accuracy: {currentIndex === 0 ? '—' : `${Math.round((scoreCount / currentIndex) * 100)}%`}
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
        <Motion.div
          className="h-full bg-cyan-500 rounded-full"
          animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden min-h-[400px]">
        <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-slate-800 dark:text-slate-100 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4 mb-8">
          {currentQ.options.map((opt, idx) => {
            let style = 'border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20';
            if (isAnswered) {
              if (idx === currentQ.answer) style = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold';
              else if (idx === selectedOption) style = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400';
              else style = 'border-slate-200 dark:border-slate-800 opacity-50';
            }
            return (
              <AnimatePresence key={idx}>
                <Motion.button
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${style}`}
                >
                  <span className="pr-4">{opt}</span>
                  {isAnswered && idx === currentQ.answer && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isAnswered && idx === selectedOption && idx !== currentQ.answer && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </Motion.button>
              </AnimatePresence>
            );
          })}
        </div>

        {/* Feedback */}
        <div className={`transition-all duration-500 ${isAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
            <p className="font-bold mb-2">{isCorrect ? '✓ Threat Neutralized.' : '✗ Assessment Failed.'}</p>
            <p className="text-sm">{currentQ.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {currentIndex < questions.length - 1 ? 'Next Scenario' : 'Finalize Report'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
