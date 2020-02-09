const render = (ast, currentName = '') => {
  const reducer = (acc, node) => {
    const name = (currentName === '') ? `${node.name}` : `${currentName}.${node.name}`;

    const beforeStr = [
      {
        str: '[complex value]',
        check: () => node.valueBefore instanceof Object,
      },
      {
        str: `'${node.valueBefore}'`,
        check: () => typeof node.valueBefore === 'string',
      },
      {
        str: node.valueBefore,
        check: () => true,
      },
    ];

    const afterStr = [
      {
        str: '[complex value]',
        check: () => node.valueAfter instanceof Object,
      },
      {
        str: `'${node.valueAfter}'`,
        check: () => typeof node.valueAfter === 'string',
      },
      {
        str: node.valueAfter,
        check: () => true,
      },
    ];

    const getBeforeStr = () => {
      const object = beforeStr.find(({ check }) => check());
      return object.str;
    };
    const getAfterStr = () => {
      const object = afterStr.find(({ check }) => check());
      return object.str;
    };

    const before = getBeforeStr();
    const after = getAfterStr();

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
