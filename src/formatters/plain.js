
const stringTypes = [
  {
    str: () => '[complex value]',
    check: (value) => value instanceof Object,
  },
  {
    str: (value) => `'${value}'`,
    check: (value) => typeof value === 'string',
  },
  {
    str: (value) => value,
    check: () => true,
  },
];

const render = (ast, currentName = '') => {
  const reducer = (acc, node) => {
    const name = (currentName === '') ? `${node.name}` : `${currentName}.${node.name}`;
    const stringMake = (valueType) => {
      const object = stringTypes.find(({ check }) => check(node[valueType]));
      return object.str(node[valueType]);
    };
    const before = stringMake('valueBefore');
    const after = stringMake('valueAfter');
    const state = node.currentState;
    const firstPart = `Property '${name}' was`;
    const strUpdated = `${firstPart} updated. From ${before} to ${after}\r\n`;

    const newString = {
      deleted: `${firstPart} removed\r\n`,
      changedInside: `${strUpdated}${render(node.children, name)}`,
      changedObj: strUpdated,
      changed: strUpdated,
      unchanged: `${firstPart}n't changed\r\n`,
      added: `${firstPart} added with value: ${after}\r\n`,
    };

    return `${acc}${newString[state]}`;
  };
  return `${ast.reduce(reducer, '')}`;
};

export default render;
