import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickStudio',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@twick/timeline',
        '@twick/video-editor'
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