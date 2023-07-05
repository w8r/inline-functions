import { add, Vec2, fn2 } from "./utils";

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

const crossProduct = (u: Vec2, v: Vec2, dest: Vec2): number =>
  u[0] * v[1] - u[1] * v[0];
const crossProduct2 = crossProduct;

const add2 = add;
export function inlined() {
  const foo: Vec2 = [4, 5];
  const bar: Vec2 = [5, fn2(6, 12)];
  const baz: Vec2 = [33, 22];

  for (let i = 0; i < 100; i++) {
    add(foo, bar);
    add(baz, bar);
    add(foo, baz);
    crossProduct(foo, bar, baz);
  }

  return foo;
}

export function notInlined() {
  const foo: Vec2 = [4, 5];
  const bar: Vec2 = [5, fn2(6, 12)];
  const baz: Vec2 = [33, 22];

  for (let i = 0; i < 100; i++) {
    add2(foo, bar);
    add2(baz, bar);
    add2(foo, baz);
    crossProduct2(foo, bar, baz);
  }

  return foo;
}
