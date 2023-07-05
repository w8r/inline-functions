import { MacrosMap } from "./types";

const CALLS_RE = /^( *)(\w+)\((.+)\);/gm;
const replaceMacros =
  (macros: MacrosMap) => (_, indent: string, id: string, args: string) => {
    return macros[id](...args.split(/, +/))
      .split("\n")
      .filter((str) => str.match(/\S/))
      .map((str) => indent + str.trim())
      .join("\n");
  };

export const getCompiler = (macros: MacrosMap) => (src: string) =>
  src.replace(CALLS_RE, replaceMacros(macros));
