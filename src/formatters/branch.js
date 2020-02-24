import objectStringify from '../utils';

const render = (ast, ind = '', ind1 = '') => {
  const newIndent = `${ind}  `;
  const mapper = (node) => {
    const nodeName = node.name;
    const nodeState = node.currentState;
    const buildString = (valueType) => (node[valueType] instanceof Object
      ? objectStringify(node[valueType], newIndent) : node[valueType]);
    const stringBefore = buildString('valueBefore');
    const stringAfter = buildString('valueAfter');
    const stringPlus = `${newIndent}+ ${nodeName}: ${stringAfter}\r\n`;
    const stringMinus = `${newIndent}- ${nodeName}: ${stringBefore}\r\n`;
    const ind2 = `${ind}    `;
    const stringOptions = {
      deleted: () => stringMinus,
      changedInside: () => `${newIndent}  ${nodeName}: ${render(node.children, ind2, ind2)}\r\n`,
      changedOutside: () => `${stringMinus}${stringPlus}`,
      unchanged: () => `${newIndent}  ${nodeName}: ${stringBefore}\r\n`,
      added: () => stringPlus,
    };
    return stringOptions[nodeState]();
  };
  const mapped = ast.map(mapper).join('');
  return `{\r\n${mapped}${ind1}}`;
};

export default render;
