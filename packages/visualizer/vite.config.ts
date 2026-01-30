import path from "path";
import { defineConfig } from "vite";
import motionCanvas from '@twick/vite-plugin';

export default defineConfig({
  plugins: [motionCanvas()],
  resolve: {
    alias: {
      // Resolve jsx-dev-runtime to local shim (installed @twick/2d may not export it)
      "@twick/2d/lib/jsx-dev-runtime": path.resolve(
        __dirname,
        "src/jsx-dev-runtime-shim.ts"
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
