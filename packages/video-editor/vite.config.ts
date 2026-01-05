import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickVideoEditor',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@twick/live-player',
        '@twick/timeline'
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@twick/live-player': 'TwickLivePlayer',
          '@twick/timeline': 'TwickTimeline'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'video-editor.css';
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