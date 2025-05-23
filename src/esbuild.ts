import * as fs from "fs";
import { name } from "../package.json";
import type { Plugin } from "esbuild";
import { getCompiler } from "./utils";
import { Options } from "./types";
export * from "./types";

export default function inlineFunction({
  macros = {},
  verbose = false,
}: Options): Plugin {
  return {
    name,
    setup(build) {
      const compile = getCompiler(macros, verbose);
      build.onLoad({ filter: /.*/ }, async (args) => {
        const source = await fs.promises.readFile(args.path, "utf8");
        // Replace the calculate function calls with 42
        const newSource = compile(source);
        return {
          contents: newSource,
          loader: "default",
        };
      });
    },
  };
}
