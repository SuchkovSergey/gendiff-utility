import objStringify from '../utils';

const render = (ast, ind = '', ind1 = '') => {
  const newIndent = `${ind}  `;
  const mapper = (node) => {
    const strBuild = (valueType) => (node[valueType] instanceof Object
      ? objStringify(node[valueType], newIndent) : node[valueType]);
    const valueBefore = strBuild('valueBefore');
    const valueAfter = strBuild('valueAfter');
    const state = node.currentState;
    const strPlus = `${newIndent}+ ${node.name}: ${valueAfter}\r\n`;
    const strMinus = `${newIndent}- ${node.name}: ${valueBefore}\r\n`;
    const ind2 = `${ind}    `;
    const stringOptions = {
      deleted: () => strMinus,
      changedInside: () => `${newIndent}  ${node.name}: ${render(node.children, ind2, ind2)}\r\n`,
      changedOutside: () => `${strMinus}${strPlus}`,
      unchanged: () => `${newIndent}  ${node.name}: ${valueBefore}\r\n`,
      added: () => strPlus,
    };
    return stringOptions[state]();
  };
  const mapped = ast.map(mapper).join('');
  return `{\r\n${mapped}${ind1}}`;
};

export default render;
