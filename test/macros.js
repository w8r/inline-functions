let counter = 0;
export const macros = {
  add: (a, b) => {
    const _a = `_a${counter++}`;
    const _b = `_b${counter++}`;
    return `
  const ${_a} = ${a};
  const ${_b}  = ${b};
  ${_a}[0] = ${_a}[0] + ${_b}[0];
  ${_a}[1] = ${_a}[1] + ${_b}[1];
  `;
  },
  crossProduct: (a, b, d) => {
    const _a = `_a${counter++}`;
    const _b = `_b${counter++}`;
    const _d = `_d${counter++}`;
    return `
  const ${_a} = ${a};
  const ${_b}  = ${b};
  const ${_d}  = ${d};
  ${_d}[0] = ${_a}[0] * ${_b}[0];
  ${_d}[1] = ${_a}[1] * ${_b}[1];
  `;
  },
};
