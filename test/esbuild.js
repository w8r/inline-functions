import esbuild from "esbuild";
import inlineFunction from "../dist/esbuild.js";
import { macros } from "./macros.js";

esbuild
  .build({
    entryPoints: ["./test/test.ts"],
    bundle: true,
    format: "esm",
    outfile: "./test/dist/esbuild.js",
    plugins: [inlineFunction({ macros, verbose: false })],
  })
  .catch(() => process.exit(1));
