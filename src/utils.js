const objectStringify = (object, indent = '') => {
  const newIndent = `${indent}  `;
  const keys = Object.keys(object);
  const reducer = (acc, key) => {
    const newString = `${newIndent}  ${key}: ${object[key]}\r\n`;
    return `${acc}  ${newString}`;
  };
  const currentString = keys.reduce(reducer, '{\r\n');
  return `${currentString}${newIndent}}`;
};

export default objectStringify;
