import bench from "benny";
import * as rollup from "./dist/rollup.js";
import * as esbuild from "./dist/esbuild.js";
import * as vite from "./dist/vite.js";

bench.suite(
  "Vite",
  bench.add("Inlined", vite.inlined),
  bench.add("Not inlined", vite.notInlined),
  bench.cycle(),
  bench.complete()
);

bench.suite(
  "Rollup",
  bench.add("Inlined", rollup.inlined),
  bench.add("Not inlined", rollup.notInlined),
  bench.cycle(),
  bench.complete()
);

bench.suite(
  "esbuild",
  bench.add("Inlined", esbuild.inlined),
  bench.add("Not inlined", esbuild.notInlined),
  bench.cycle(),
  bench.complete()
);
