import { defineConfig } from "vite";
import inlineFunction from "../dist/vite";
import { resolve } from "path";
import { macros } from "./macros";

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
