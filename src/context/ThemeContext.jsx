// Coded by Lucky
import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useTheme() {
  return useContext(ThemeContext);
}
