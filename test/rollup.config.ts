import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import inlineFunction from "../dist/rollup";
import { macros } from "./macros";

const config: RollupOptions = {
  input: "./test/test.ts",
  output: {
    file: "./test/dist/rollup.js",
    name: "inlineFunction",
    format: "esm",
    exports: "named",
  },
  plugins: [typescript(), inlineFunction({ macros })],
};

export default config;
