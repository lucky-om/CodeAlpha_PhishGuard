import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

// Handle GitHub Pages path vs Custom Domain
const hostname = window.location.hostname;
const basename = hostname === 'phishguard.luckyverse.tech' ? '/' : (hostname.includes('github.io') ? '/CodeAlpha_PhishGuard' : '/');

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
