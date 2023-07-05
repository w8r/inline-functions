import { name } from "../package.json";
import { transformWithEsbuild, Plugin } from "vite";
import { Options } from "./types";
import { getCompiler } from "./utils";

export default function inlineFunction({ macros = {} }: Options): Plugin {
  const compile = getCompiler(macros);
  return {
    name,
    enforce: "pre",
    async transform(code, id, opts) {
      return transformWithEsbuild(compile(code), id);
    },
  };
}
