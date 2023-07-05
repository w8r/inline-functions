export type Macros = (...args: unknown[]) => string;
export type MacrosMap = Record<string, (...args: unknown[]) => string>;
export interface Options {
  macros: MacrosMap;
}
