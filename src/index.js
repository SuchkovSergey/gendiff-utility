import pathParse from './parsers';
import branchRender from './formatters/branch';
import plainRender from './formatters/plain';
import jsonRender from './formatters/json';

const parse = (firstFile, secondFile) => {
  const keysOne = Object.keys(firstFile);
  const keysTwo = Object.keys(secondFile);
  const result = [];

  const reducerFirst = (acc, key) => {
    const valueBefore = firstFile[key] || '';
    const valueAfter = secondFile[key] || '';
    const isBeforeObj = valueBefore instanceof Object;
    const isAfterObj = valueAfter instanceof Object;
    const children = isBeforeObj && isAfterObj ? parse(valueBefore, valueAfter) : [];

    let currentState = '';

    switch (true) {
      case !keysTwo.includes(key):
        currentState = 'deleted';
        break;
      case isBeforeObj && isAfterObj:
        currentState = 'changedInside';
        break;
      case isBeforeObj || isAfterObj:
        currentState = 'changedObj';
        break;
      case valueBefore === valueAfter:
        currentState = 'unchanged';
        break;
      default:
        currentState = 'changed';
    }

    const root = {
      name: key,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };
    return [...acc, { ...root }];
  };

  const firstStep = keysOne.reduce(reducerFirst, result);

  const reducerSecond = (acc, key) => {
    const root = {
      name: key,
      currentState: 'added',
      valueBefore: '',
      valueAfter: secondFile[key],
      children: [],
    };
    if (!keysOne.includes(key)) {
      return [...acc, { ...root }];
    }
    return acc;
  };

  return keysTwo.reduce(reducerSecond, firstStep);
};

const formatters = {
  branch: branchRender,
  plain: plainRender,
  json: jsonRender,
};

const genDiff = (pathOne, pathTwo, format = 'branch') => {
  const firstFile = pathParse(pathOne);
  const secondFile = pathParse(pathTwo);
  const ast = parse(firstFile, secondFile);
  const formatter = formatters[format];
  return formatter ? formatter(ast) : null;
};

export default genDiff;
