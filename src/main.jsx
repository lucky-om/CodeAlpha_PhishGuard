import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

// Custom domain (CNAME = phishguard.luckyverse.tech) → basename is always '/'.
// If deployed to GitHub Pages subfolder without CNAME, set to '/CodeAlpha_PhishGuard'.
const basename = window.location.hostname.endsWith('github.io') ? '/CodeAlpha_PhishGuard' : '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GameProvider>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </GameProvider>
    </ThemeProvider>
  </StrictMode>,
)
