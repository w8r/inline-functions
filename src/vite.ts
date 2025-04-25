import { name } from "../package.json";
import { transformWithEsbuild, type Plugin } from "vite";
import { Options } from "./types";
import { getCompiler } from "./utils";

export default function inlineFunction({
  macros = {},
  verbose = false,
}: Options): Plugin {
  const compile = getCompiler(macros, verbose);
  return {
    name,
    enforce: "pre",
    async transform(code, id, opts) {
      return transformWithEsbuild(compile(code), id);
    },
  };
}
