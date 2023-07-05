import bench from "benny";
import { inlined, notInlined } from "./dist/esbuild.js";

bench.suite(
  "My suite",
  bench.add("Inlined", inlined),
  bench.add("Not inlined", notInlined),
  bench.cycle(),
  bench.complete()
);
