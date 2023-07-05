import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import inlineFunction from "../dist/rollup";

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

const config: RollupOptions = {
  input: "./test/test.ts",
  output: {
    file: "./test/dist/rollup.js",
    name: "rollup",
    format: "cjs",
    exports: "named",
  },
  plugins: [typescript(), inlineFunction({ macros })],
};

export default config;
