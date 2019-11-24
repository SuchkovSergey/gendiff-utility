import objStringify from '../utils';

const render = (ast, indent = '', indent1 = '') => {
  const newIndent = `${indent}  `;
  const reducerFirst = (acc, value) => {
    let strOne = '';
    let strTwo = '';
    const before = value.valueBefore instanceof Object
      ? objStringify(value.valueBefore, newIndent) : value.valueBefore;
    const after = value.valueAfter instanceof Object
      ? objStringify(value.valueAfter, newIndent) : value.valueAfter;
    const state = value.currentState;
    const strPlusAfter = `${newIndent}+ ${value.name}: ${after}\r\n`;
    const strMinusBefore = `${newIndent}- ${value.name}: ${before}\r\n`;
    const strUnchanged = `${newIndent}  ${value.name}: ${before}\r\n`;

    if (state === 'deleted') {
      strOne = strMinusBefore;
    }
    if (state === 'changedInside') {
      const indent2 = `${newIndent}  `;
      strOne = `${newIndent}  ${value.name}: ${render(value.children, indent2, indent2)}\r\n`;
    }
    if (state === 'changedObj' || state === 'changed') {
      strOne = strMinusBefore;
      strTwo = strPlusAfter;
    }
    if (state === 'unchanged') {
      strOne = strUnchanged;
    }
    if (state === 'added') {
      strTwo = strPlusAfter;
    }

    return `${acc}${strOne}${strTwo}`;
  };
  const renderedAST = `${ast.reduce(reducerFirst, '{\r\n')}${indent1}}`;
  return renderedAST;
};

export default render;
