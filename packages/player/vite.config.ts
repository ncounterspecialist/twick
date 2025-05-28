import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickPlayer',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React/jsx-runtime'
        },
        preserveModules: false,
        manualChunks: undefined
      },
    },
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      '@twick/player': resolve(__dirname, 'src/index.ts')
    }
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      rollupTypes: true,
      compilerOptions: {
        sourceMap: true,
        declarationMap: true,
      },
    }),
  ],
});