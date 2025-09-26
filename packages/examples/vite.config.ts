import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removed external dependencies - this is a standalone app, not a library
  // All dependencies including React will be bundled
})
