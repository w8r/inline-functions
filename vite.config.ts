//import { name } from "./package.json";
//import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
//import { inlineFunctionPlugin } from "./src/esbuild.js";

export default defineConfig({
  build: {
    lib: {
      entry: [
        "./src/esbuild.ts",
        "./src/vite.ts",
        "./src/rollup.ts",
        "./src/index.ts",
      ],
      name: "inline-function",
    },
    rollupOptions: {
      external: ["fs", "vite"],
    },
  },
  plugins: [
    dts({
      root: "./src",
      include: ["./**/*.ts"],
      outDir: "../dist",
    }),
  ],
  test: {
    include: ["test/**/*.test.ts"],
  },
});
