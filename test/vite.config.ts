import { defineConfig } from "vite";
import inlineFunction from "../dist/vite";
import { resolve } from "path";

let counter = 0;
const macros = {
  x: (a, b) => a + b,
  add: (a, b) => {
    const _a = `_a${counter++}`;
    const _b = `_b${counter++}`;
    return `
  const ${_a} = ${a};
  const ${_b}  = ${b};
  ${_a}[0] = ${_a}[0] + ${_b}[0];
  ${_a}[1] = ${_a}[1] + ${_b}[1];
  `;
  },
};

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./test.ts"),
      name: "test",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "vite.js",
      },
    },
    outDir: resolve(__dirname, "./dist"),
    emptyOutDir: false,
    minify: false,
  },

  plugins: [inlineFunction({ macros })],
});
