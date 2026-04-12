import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Vite configuration for PhishGuard v2.0.0
// base: './' ensures asset paths work on both custom domains and subfolders
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', 
})
