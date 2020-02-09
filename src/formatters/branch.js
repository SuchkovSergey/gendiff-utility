import objStringify from '../utils';

const render = (ast, indent = '', indent1 = '') => {
  const newIndent = `${indent}  `;
  const reducer = (acc, node) => {
    const strBuild = (valueType) => (node[valueType] instanceof Object
      ? objStringify(node[valueType], newIndent) : node[valueType]);
    const before = strBuild('valueBefore');
    const after = strBuild('valueAfter');
    const state = node.currentState;
    const strPlus = `${newIndent}+ ${node.name}: ${after}\r\n`;
    const strMinus = `${newIndent}- ${node.name}: ${before}\r\n`;
    const strUnchanged = `${newIndent}  ${node.name}: ${before}\r\n`;
    const ind2 = `${newIndent}  `;
    const strOneNew = {
      deleted: strMinus,
      changedInside: `${newIndent}  ${node.name}: ${render(node.children, ind2, ind2)}\r\n`,
      changedObj: `${strMinus}${strPlus}`,
      changed: `${strMinus}${strPlus}`,
      unchanged: strUnchanged,
      added: strPlus,
    };
    return `${acc}${strOneNew[state]}`;
  };
  return `${ast.reduce(reducer, '{\r\n')}${indent1}}`;
};

export default render;
