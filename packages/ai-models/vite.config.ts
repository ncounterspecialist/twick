import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TwickAIModels",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    minify: false,
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
  },
  plugins: [
    dts({
      include: ["src"],
      exclude: ["**/*.test.ts"],
      rollupTypes: true,
      compilerOptions: {
        sourceMap: true,
        declarationMap: true,
      },
    }),
  ],
});
