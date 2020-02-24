const stringTypes = [
  {
    string: () => '[complex value]',
    check: (value) => value instanceof Object,
  },
  {
    string: (value) => `'${value}'`,
    check: (value) => typeof value === 'string',
  },
  {
    string: (value) => value,
    check: () => true,
  },
];

const render = (ast, currentPropName = null) => {
  const mapper = (node) => {
    const propertyName = (currentPropName === null) ? `${node.name}` : `${currentPropName}.${node.name}`;
    const buildString = (valueType) => stringTypes
      .find(({ check }) => check(node[valueType]))
      .string(node[valueType]);
    const valueBefore = buildString('valueBefore');
    const valueAfter = buildString('valueAfter');
    const state = node.currentState;
    const firstPartOfString = `Property '${propertyName}' was`;
    const contentUpdated = `${firstPartOfString} updated. From ${valueBefore} to ${valueAfter}\r\n`;

    const stringOptions = {
      deleted: () => `${firstPartOfString} removed\r\n`,
      changedInside: () => `${contentUpdated}${render(node.children, propertyName)}`,
      changedOutside: () => contentUpdated,
      unchanged: () => `${firstPartOfString}n't changed\r\n`,
      added: () => `${firstPartOfString} added with value: ${valueAfter}\r\n`,
    };
    return stringOptions[state]();
  };
  return ast.map(mapper).join('');
};

export default render;
