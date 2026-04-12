import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

// Calculate basename based on the current hostname to support both custom domain and repo URL
const basename = window.location.hostname === 'phishguard.luckyverse.tech' ? '/' : '/CodeAlpha_PhishGuard';

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
