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
    const name = (currentPropName === '') ? `${node.name}` : `${currentPropName}.${node.name}`;
    const stringMake = (valueType) => {
      const object = stringTypes.find(({ check }) => check(node[valueType]));
      return object.str(node[valueType]);
    };
    const contentBefore = stringMake('valueBefore');
    const contentAfter = stringMake('valueAfter');
    const state = node.currentState;
    const firstStrPart = `Property '${name}' was`;
    const contentUpdated = `${firstStrPart} updated. From ${contentBefore} to ${contentAfter}\r\n`;

    const stringOptions = {
      deleted: `${firstStrPart} removed\r\n`,
      changedInside: `${contentUpdated}${render(node.children, name)}`,
      changedObject: contentUpdated,
      changed: contentUpdated,
      unchanged: `${firstStrPart}n't changed\r\n`,
      added: `${firstStrPart} added with value: ${contentAfter}\r\n`,
    };

    return `${acc}${stringOptions[state]}`;
  };
  return `${ast.reduce(reducer, '')}`;
};

export default render;
