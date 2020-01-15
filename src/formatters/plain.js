const render = (ast, currentName = '') => {
  const reducer = (acc, value) => {
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
    const firstPart = `Property '${name}' was`;
    const strUpdated = `${firstPart} updated. From ${before} to ${after}\r\n`;

    const strOneNew = {
      deleted: `${firstPart} removed\r\n`,
      changedInside: `${strUpdated}${render(value.children, name)}`,
      changedObj: strUpdated,
      changed: strUpdated,
      unchanged: `${firstPart}n't changed\r\n`,
      added: '',
    };

    strTwo = state === 'added' ? `${firstPart} added with value: ${after}\r\n` : '';

    const strOne = strOneNew[state];
    return `${acc}${strOne}${strTwo}`;
  };
  const renderedAST = `${ast.reduce(reducer, '')}`;
  return renderedAST;
};

export default render;


/*
if (state === 'deleted') {
  strOne = `${firstPart} removed\r\n`;
}
if (state === 'changedInside') {
  strOne = `${strUpdated}${render(value.children, name)}`;
}
if (state === 'changedObj' || state === 'changed') {
  strOne = strUpdated;
}
if (state === 'unchanged') {
  strOne = `${firstPart}n't changed\r\n`;
}
if (state === 'added') {
  strTwo = `${firstPart} added with value: ${after}\r\n`;
}
*/
