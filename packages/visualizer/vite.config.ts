import { defineConfig } from "vite";
import motionCanvas from '@revideo/vite-plugin';

export default defineConfig({
  plugins: [motionCanvas()],
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
