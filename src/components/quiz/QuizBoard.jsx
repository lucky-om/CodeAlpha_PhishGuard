
import { useState } from 'react';
import { getShuffledQuestions } from '../../utils/quizData';
import { CheckCircle2, XCircle, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function QuizBoard() {
  const [questions, setQuestions] = useState(() => getShuffledQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const { markSectionComplete } = useGame();
  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = index === questions[currentIndex].answer;
    if (isCorrect) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalScorePercentage = scoreCount / questions.length;
      const pointsToAward = Math.floor(finalScorePercentage * 50);
      markSectionComplete('quiz', pointsToAward);
    }
  };

  const restartQuiz = () => {
    setQuestions(getShuffledQuestions());
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreCount(0);
    setQuizFinished(false);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (quizFinished) {
    const accuracy = Math.round((scoreCount / questions.length) * 100);
    const passed = accuracy >= 80;

    return (
      <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl mx-auto">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto ${
          passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
        }`}>
          {passed ? <Award className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />}
        </div>
        <h3 className="text-3xl font-extrabold mb-2 text-slate-800 dark:text-slate-100">
          Mission Complete
        </h3>
        <div className="text-6xl font-mono font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
          {accuracy}%
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          {passed 
            ? "Excellent work! You have proven your ability to detect and neutralize advanced phishing threats."
            : "Review the materials in the gallery and visualizer, and try again to improve your threat detection accuracy."}
        </p>
        
        <button 
          onClick={restartQuiz}
          className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold"
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.answer;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 text-sm font-mono">
        <div className="flex items-center gap-4">
           <span className="text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
           <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${
             currentQ.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
             currentQ.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
             'bg-rose-500/10 text-rose-500 border border-rose-500/20'
           }`}>
             {currentQ.difficulty}
           </span>
        </div>
        <span className="text-slate-500">Accuracy: {currentIndex === 0 ? '0' : Math.round((scoreCount / currentIndex) * 100)}%</span>
      </div>
      
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-cyan-500 transition-all duration-500" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden min-h-[400px]">
        <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-slate-800 dark:text-slate-100 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4 mb-8">
          {currentQ.options.map((opt, idx) => {
            let btnStyling = "border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20";
            
            if (isAnswered) {
              if (idx === currentQ.answer) {
                btnStyling = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold";
              } else if (idx === selectedOption) {
                btnStyling = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400";
              } else {
                btnStyling = "border-slate-200 dark:border-slate-800 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnStyling}`}
              >
                <span className="pr-4">{opt}</span>
                {isAnswered && idx === currentQ.answer && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.answer && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <div className={`transition-all duration-500 ${isAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
            <p className="font-bold mb-2 flex items-center gap-2">
              {isCorrect ? "Threat Neutralized." : "Assessment Failed."}
            </p>
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
