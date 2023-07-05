import { describe, it, assert, expect } from "vitest";
import * as fs from "fs/promises";
import { resolve } from "path";

describe("plugins", () => {
  it("esbuild", async () => {
    const source = await fs.readFile(
      resolve(__dirname, "./dist/esbuild.js"),
      "utf8"
    );
    expect(source).toMatchSnapshot();
  });

  it("vite", async () => {
    const source = await fs.readFile(
      resolve(__dirname, "./dist/vite.js"),
      "utf8"
    );
    expect(source).toMatchSnapshot();
  });

  it("rollup", async () => {
    const source = await fs.readFile(
      resolve(__dirname, "./dist/rollup.js"),
      "utf8"
    );
    expect(source).toMatchSnapshot();
  });
});
