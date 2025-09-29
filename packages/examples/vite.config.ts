import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removed external dependencies - this is a standalone app, not a library
  // All dependencies including React will be bundled
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: '0.0.0.0' // This is important for Vercel
  }
})