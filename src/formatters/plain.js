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

const render = (ast, currentPropName = '') => {
  const reducer = (acc, node) => {
    const propertyName = (currentPropName === '') ? `${node.name}` : `${currentPropName}.${node.name}`;
    const makeString = (valueType) => stringTypes
      .find(({ check }) => check(node[valueType]))
      .str(node[valueType]);
    const valueBefore = makeString('valueBefore');
    const valueAfter = makeString('valueAfter');
    const state = node.currentState;
    const firstPartOfString = `Property '${propertyName}' was`;
    const contentUpdated = `${firstPartOfString} updated. From ${valueBefore} to ${valueAfter}\r\n`;

    const stringOptions = {
      deleted: () => `${firstPartOfString} removed\r\n`,
      changedInside: () => `${contentUpdated}${render(node.children, propertyName)}`,
      changedObject: () => contentUpdated,
      changed: () => contentUpdated,
      unchanged: () => `${firstPartOfString}n't changed\r\n`,
      added: () => `${firstPartOfString} added with value: ${valueAfter}\r\n`,
    };

    return `${acc}${stringOptions[state]()}`;
  };
  return `${ast.reduce(reducer, '')}`;
};

export default render;
