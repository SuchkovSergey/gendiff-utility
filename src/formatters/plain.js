const render = (ast, currentName = '') => {
  const reducer = (acc, node) => {
    const name = (currentName === '') ? `${node.name}` : `${currentName}.${node.name}`;
    let before;
    let after;

    switch (true) {
      case node.valueBefore instanceof Object:
        before = '[complex value]';
        break;
      case typeof node.valueBefore === 'string':
        before = `'${node.valueBefore}'`;
        break;
      default:
        before = node.valueBefore;
    }

    switch (true) {
      case node.valueAfter instanceof Object:
        after = '[complex value]';
        break;
      case typeof node.valueAfter === 'string':
        after = `'${node.valueAfter}'`;
        break;
      default:
        after = node.valueAfter;
    }

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
