const render = (ast, currentName = '') => {
  const reducer = (acc, node) => {
    const name = (currentName === '') ? `${node.name}` : `${currentName}.${node.name}`;

    const stringTypes = [
      {
        str: () => '[complex value]',
        check: (value) => node[value] instanceof Object,
      },
      {
        str: (value) => `'${node[value]}'`,
        check: (value) => typeof node[value] === 'string',
      },
      {
        str: (value) => node[value],
        check: () => true,
      },
    ];

    const stringMake = (valueType) => {
      const object = stringTypes.find(({ check }) => check(valueType));
      return object.str(valueType);
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
  const renderedAST = `${ast.reduce(reducer, '')}`;
  return renderedAST;
};

export default render;
