import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickTimeline',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
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
        'lucide-react',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@react-spring/web': 'ReactSpring',
          '@use-gesture/react': 'UseGesture',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact',
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name;
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      // Disable type rollup for this package to avoid
      // API Extractor resolution issues with "./src/index"
      rollupTypes: false,
      compilerOptions: {
        sourceMap: true,
        declarationMap: true,
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});