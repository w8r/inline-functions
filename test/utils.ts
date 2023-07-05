export type Vec2 = [number, number];

export function add(u: Vec2, v: Vec2): void {
  u[0] = u[0] + v[0];
  u[1] = u[1] + v[1];
}

export const fn2 = (a: number, b: number): number => a + b;
