import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100 percentage
  
  // Track unlocks/completion of sections
  const [completedSections, setCompletedSections] = useState({
    gallery: false,
    visualizer: false,
    detector: false,
    quiz: false,
  });

  const addScore = (points) => {
    setScore(prev => Math.min(prev + points, 100));
  };

  const markSectionComplete = (section, points) => {
    if (!completedSections[section]) {
      setCompletedSections(prev => ({ ...prev, [section]: true }));
      addScore(points);
      setProgress(prev => Math.min(prev + 25, 100)); // Roughly 4 main sections
    }
  };

  const resetGame = () => {
    setScore(0);
    setProgress(0);
    setCompletedSections({
      gallery: false,
      visualizer: false,
      detector: false,
      quiz: false,
    });
  };

  return (
    <GameContext.Provider value={{ score, progress, completedSections, markSectionComplete, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
