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

const stringify = (object, indent = '') => {
  const newIndent = `${indent}  `;
  const keys = Object.keys(object);
  const reducer = (acc, key) => {
    const strOne = `${newIndent}  ${key}: ${object[key]}\r\n`;
    return `${acc}  ${strOne}`;
  };
  const str = keys.reduce(reducer, '{\r\n');
  return `${str}${newIndent}}`;
};

export default stringify;
