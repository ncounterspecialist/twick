import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // Inline effect preview images so the library is self-contained; consumers get images automatically.
    assetsInlineLimit: 10 * 1024 * 1024,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickStudio',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External dependencies that should not be bundled.
      // React and React DOM are external to avoid duplication.
      // @twick packages are external to:
      // 1. Avoid bundling React contexts (which must be the same instance)
      // 2. Allow proper tree-shaking in consuming applications
      // 3. Ensure consistent versions across the monorepo
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@twick/timeline',
        '@twick/video-editor',
        '@twick/live-player' // External to prevent React context duplication
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@twick/timeline': 'TwickTimeline',
          '@twick/video-editor': 'TwickVideoEditor'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'studio.css';
          return assetInfo.name;
        },
      },
    },
    sourcemap: true,
    minify: false
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    }),
  ]
});