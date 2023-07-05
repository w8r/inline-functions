import { MacrosMap } from "./types";

const CALLS_RE = /^( *)(\w+)\((.+)\);/gm;
const replaceMacros =
  (macros: MacrosMap, verbose: boolean) =>
  (_, indent: string, id: string, args: string) => {
    const selectedMacros = macros[id];
    if (!selectedMacros) return _;
    const replacement = selectedMacros(...args.split(/, +/))
      .split("\n")
      .filter((str) => str.match(/\S/))
      .map((str) => indent + str.trim())
      .join("\n");
    if (verbose)
      console.log(`\n${id}(${args}):\n====\n${replacement}\n=====\n`);
    return replacement;
  };

export const getCompiler =
  (macros: MacrosMap, verbose: boolean) => (src: string) =>
    src.replace(CALLS_RE, replaceMacros(macros, verbose));
