import { name } from "../package.json";
import { Plugin } from "rollup";
import { getCompiler } from "./utils";
import { Options } from "./types";

export default function inlineFunction({ macros = {} }: Options): Plugin {
  const compile = getCompiler(macros);
  return {
    name,
    transform(code) {
      return { code: compile(code) };
    },
  };
}
