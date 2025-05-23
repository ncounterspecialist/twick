import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TwickCanvas',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'fabric', 'react/jsx-runtime' 
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          fabric: 'fabric',
          'react/jsx-runtime': 'React/jsx-runtime'
        }
      },
    },
    sourcemap: true,
    minify: false,
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