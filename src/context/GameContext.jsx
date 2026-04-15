// Coded by Lucky
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [completedSections, setCompletedSections] = useState({
    gallery: false,
    visualizer: false,
    detector: false,
    quiz: false,
  });

  // Marks a simulation section as complete. Points param kept for API compatibility.
  const markSectionComplete = (section) => {
    if (!completedSections[section]) {
      setCompletedSections(prev => ({ ...prev, [section]: true }));
    }
  };

  return (
    <GameContext.Provider value={{ completedSections, markSectionComplete }}>
      {children}
    </GameContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useGame() {
  return useContext(GameContext);
}
