/*
const stringify = (str) => {
  const arrayOfSymbols = str.split('');
  const newArr = [];
  for (const symbol of arrayOfSymbols) {
    if (symbol !== '"') {
      newArr.push(symbol);
    }
  }
  return newArr.join('');
};
*/

const objStringify = (object, indent = '') => {
  const newIndent = `${indent}  `;
  const keys = Object.keys(object);
  const reducer = (acc, key) => {
    const strOne = `${newIndent}  ${key}: ${object[key]}\r\n`;
    return `${acc}  ${strOne}`;
  };
  const str = keys.reduce(reducer, '{\r\n');
  return `${str}${newIndent}}`;
};

const finalPathBuilder = (path) => {
  const firstSymbol = path[0];
  return firstSymbol === '/' ? path : `${__filename}/${path}`;
};

export { objStringify, finalPathBuilder };


// `${__dirname}/__fixtures__/before.json`
