import objStringify from '../utils';

const render = (ast, indent = '', indent1 = '') => {
  const newIndent = `${indent}  `;
  const reducer = (acc, node) => {
    const before = node.valueBefore instanceof Object
      ? objStringify(node.valueBefore, newIndent) : node.valueBefore;
    const after = node.valueAfter instanceof Object
      ? objStringify(node.valueAfter, newIndent) : node.valueAfter;
    const state = node.currentState;
    const strPlus = `${newIndent}+ ${node.name}: ${after}\r\n`;
    const strMinus = `${newIndent}- ${node.name}: ${before}\r\n`;
    const strUnchanged = `${newIndent}  ${node.name}: ${before}\r\n`;
    const ind2 = `${newIndent}  `;
    const strOneNew = {
      deleted: strMinus,
      changedInside: `${newIndent}  ${node.name}: ${render(node.children, ind2, ind2)}\r\n`,
      changedObj: strMinus,
      changed: strMinus,
      unchanged: strUnchanged,
      added: '',
    };
    const strTwoNew = {
      deleted: '',
      changedInside: '',
      changedObj: strPlus,
      changed: strPlus,
      unchanged: '',
      added: strPlus,
    };
    const strOne = strOneNew[state];
    const strTwo = strTwoNew[state];
    return `${acc}${strOne}${strTwo}`;
  };
  return `${ast.reduce(reducer, '{\r\n')}${indent1}}`;
};

export default render;
