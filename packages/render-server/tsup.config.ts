import { defineConfig } from 'tsup';

export default defineConfig([
  // Build index.ts in both CJS and ESM for library exports
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    external: [
      '@twick/2d',
      '@twick/core',
      '@twick/ffmpeg',
      '@twick/renderer',
      '@twick/ui',
      '@twick/visualizer',
      'cors',
      'express',
      'express-rate-limit',
      'node-fetch',
      'path'
    ],
  },
  // Build cli.ts and server.ts only as ESM (they use import.meta)
  {
    entry: ['src/cli.ts', 'src/server.ts'],
    format: ['esm'],
    dts: false, // No need for declarations for CLI/server files
    splitting: false,
    sourcemap: true,
    outDir: 'dist',
    external: [
      '@twick/2d',
      '@twick/core',
      '@twick/ffmpeg',
      '@twick/renderer',
      '@twick/ui',
      '@twick/visualizer',
      'cors',
      'express',
      'express-rate-limit',
      'node-fetch',
      'path'
    ],
  },
]);
