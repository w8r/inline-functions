import { name } from "../package.json";
import type { Plugin } from "rollup";
import { getCompiler } from "./utils";
import { Options } from "./types";

export default function inlineFunction({
  macros = {},
  verbose = false,
}: Options): Plugin {
  const compile = getCompiler(macros, verbose);
  return {
    name,
    transform(code) {
      return { code: compile(code) };
    },
  };
}
