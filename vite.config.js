import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Vite configuration for PhishGuard v2.0.0
// base: '/' is correct for custom domains like phishguard.luckyverse.tech
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', 
})
