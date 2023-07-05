# `inline-functions` [![npm version](https://badge.fury.io/js/inline-functions.svg)](https://badge.fury.io/js/inline-functions)

This library allows you to inline functions in your JS/TS code. This is useful for performance reasons, as it allows you to avoid function calls and instead inline the function body directly.

It comes as a collection of plugins for different build systems. It is designed to be used with [`vite`](https://vitejs.dev), [`rollup`](https://rollupjs.org), and [`esbuild`](https://esbuild.github.io).

Inspired by the clever trick used in [`robust-predicates`](https://github.com/mourner/robust-predicates/blob/c20b0ab9ab4c4f2969f3611908c41ce76aa0e7a7/compile.js) by @mourner.

## Installation

```bash
npm install inline-functions [vite] [rollup] [esbuild]
```

## How it works

This plugin works by replacing function calls with the function body. This is done by using a macro system. The macro system is a simple object that maps function names to their bodies. For example:

```ts
import { Vec2, fn2 } from "./utils";

// this is the "real" implementation of the function
// it guarantees that the code will work even if the inlining step is skipped
const add = (a: Vec2, b: Vec2): Vec2 => {
  a[0] += b[0];
  a[1] += b[1];
};

const foo: Vec2 = [4, 5];
const bar: Vec2 = [5, fn2(6, 12)];

const ZERO = (): Vec2 => [0, 0];

const baz: Vec2 = [33, 22];
// note that you can use the function in the macro,
// if your replacement function can handle it
add(baz, ZERO());

// so that dead code removal doesn't remove the function altogether
console.log(foo, baz);

// this will work, but will be removed as dead code
add(ZERO(), bar);
```

Then the macros to inline the `add()` function calls, would look like this:

```ts
// counter is used to generate unique variable names
let counter = 0;
const macros = {
  add: (a, b) => {
    const _a = `_a${counter++}`;
    const _b = `_b${counter++}`;
    // this will reference the arguments passed to the function
    return `
  const ${_a} = ${a};
  const ${_b}  = ${b};
  ${_a}[0] = ${_a}[0] + ${_b}[0];
  ${_a}[1] = ${_a}[1] + ${_b}[1];
  `;
  },
};
```

And the result of this replacement is:

```js
var foo = [4, 5];
var ZERO = function () {
  return [0, 0];
};
var baz = [33, 22];
// note that you can use the function in the macro,
// if your replacement function can handle it
const _a0 = baz;
const _b1 = ZERO();
_a0[0] = _a0[0] + _b1[0];
_a0[1] = _a0[1] + _b1[1];
// so that dead code removal doesn't remove the function altogether
console.log(foo, baz);
```

## Usage

### Vite

```bash
npm install inline-functions vite
```

Then, in your [`vite.config.ts`](./test/vite.config.ts):

```ts
import { defineConfig } from "vite";
import inlineFunction from "inline-functions/vite";
import { resolve } from "path";

import { macros } from "./macros";

export default defineConfig({
  ..., // your config
  plugins: [inlineFunction({ macros })],
});
```

### Esbuild

```bash
npm install inline-functions esbuild
```

Then, in your [`esbuild.config.js`](./test/esbuild.config.js):

```ts
import inlineFunction from "inline-functions/esbuild";
import { macros } from "./macros";
esbuild
  .build({
    entryPoints: ...,
    bundle: true,
    outfile: ...,
    plugins: [inlineFunction({ macros })],
  })
  .catch(() => process.exit(1));
```

### Rollup

```bash
npm install inline-functions rollup
```

Then, in your [`rollup.config.js`](./test/rollup.config.ts):

```js
import inlineFunction from "inline-function/rollup";
import { macros } from "./macros";

export default {
  input: ...,
  output: {
    ...
  },
  plugins: [inlineFunction({ macros })],
};

```

### Examples

See [`test`](./test) for examples and benchmarks.

### Some benchmarks

```
Running "Vite" suite...
Progress: 100%

  Inlined:
    1 464 435 ops/s, ±4.63%   | fastest

  Not inlined:
    1 187 396 ops/s, ±5.75%   | slowest, 18.92% slower

Running "Rollup" suite...

  Inlined:
    1 560 921 ops/s, ±1.27%   | fastest

  Not inlined:
    1 302 231 ops/s, ±0.11%   | slowest, 16.57% slower

Running "esbuild" suite...

  Inlined:
    1 564 889 ops/s, ±0.80%   | fastest

  Not inlined:
    1 281 501 ops/s, ±1.02%   | slowest, 18.11% slower
```
