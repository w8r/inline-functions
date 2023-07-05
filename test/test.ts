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
