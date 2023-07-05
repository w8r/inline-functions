import esbuild from "esbuild";
import inlineFunction from "../dist/esbuild.js";

let counter = 0;
const macros = {
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

esbuild
  .build({
    entryPoints: ["./test/test.ts"],
    bundle: true,
    outfile: "./test/dist/esbuild.js",
    plugins: [inlineFunction({ macros })],
  })
  .catch(() => process.exit(1));
