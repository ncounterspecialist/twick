import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickTimeline',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@react-spring/web',
        '@use-gesture/react',
        'framer-motion',
        'lucide-react'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@react-spring/web': 'ReactSpring',
          '@use-gesture/react': 'UseGesture',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'timeline.css';
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