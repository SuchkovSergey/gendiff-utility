const render = (ast, currentName = '') => {
  const reducer = (acc, value) => {
    let strOne = '';
    let strTwo = '';
    const name = (currentName === '') ? `${value.name}` : `${currentName}.${value.name}`;
    let before;
    let after;

    switch (true) {
      case value.valueBefore instanceof Object:
        before = '[complex value]';
        break;
      case typeof value.valueBefore === 'string':
        before = `'${value.valueBefore}'`;
        break;
      default:
        before = value.valueBefore;
    }

    switch (true) {
      case value.valueAfter instanceof Object:
        after = '[complex value]';
        break;
      case typeof value.valueAfter === 'string':
        after = `'${value.valueAfter}'`;
        break;
      default:
        after = value.valueAfter;
    }

    const state = value.currentState;
    const strUpdated = `Property '${name}' was updated. From ${before} to ${after}\r\n`;
    const strAdded = `Property '${name}' was added with value: ${after}\r\n`;
    const strRemoved = `Property '${name}' was removed\r\n`;
    const strUnchanged = `Property '${name}' wasn't changed\r\n`;

    if (state === 'deleted') {
      strOne = strRemoved;
    }
    if (state === 'changedInside') {
      strOne = `${strUpdated}${render(value.children, name)}`;
    }
    if (state === 'changedObj' || state === 'changed') {
      strOne = strUpdated;
    }
    if (state === 'unchanged') {
      strOne = strUnchanged;
    }
    if (state === 'added') {
      strTwo = strAdded;
    }

    return `${acc}${strOne}${strTwo}`;
  };
  const renderedAST = `${ast.reduce(reducer, '')}`;
  return renderedAST;
};

export default render;
