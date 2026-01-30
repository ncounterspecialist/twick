import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { twickBrowserRenderPlugin } from '@twick/browser-render/vite-plugin-ffmpeg'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    twickBrowserRenderPlugin(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      },
    },
  ],
  
  // Monorepo-specific: Use shared cache directory
  cacheDir: '../../node_modules/.vite',
  
  // Exclude FFmpeg from dependency optimization (has workers)
  optimizeDeps: {
    exclude: [
      '@ffmpeg/ffmpeg',
      '@ffmpeg/util',
      '@ffmpeg/core'
    ]
  },
  
  // Worker configuration for FFmpeg
  worker: {
    format: 'es',
    plugins: () => []
  },
  
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: '0.0.0.0',
  }
})