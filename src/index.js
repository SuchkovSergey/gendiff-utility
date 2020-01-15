import parser from './parsers';
import branchRender from './formatters/branch';
import plainRender from './formatters/plain';
import jsonRender from './formatters/json';

const parse = (fileOneParsed, fileTwoParsed) => {
  const keysOne = Object.keys(fileOneParsed);
  const keysTwo = Object.keys(fileTwoParsed);
  const result = [];

  const reducerFirst = (acc, value) => {
    const valueBefore = fileOneParsed[value] || '';
    const valueAfter = fileTwoParsed[value] || '';
    const isBeforeObj = valueBefore instanceof Object;
    const isAfterObj = valueAfter instanceof Object;
    const children = isBeforeObj && isAfterObj ? parse(valueBefore, valueAfter) : [];

    let currentState = '';

    switch (true) {
      case !keysTwo.includes(value):
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
      name: value,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };
    return [...acc, { ...root }];
  };

  const firstStep = keysOne.reduce(reducerFirst, result);

  const reducerSecond = (acc, value) => {
    const root = {
      name: value,
      currentState: 'added',
      valueBefore: '',
      valueAfter: fileTwoParsed[value],
      children: [],
    };
    if (!keysOne.includes(value)) {
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
  const fileOneParsed = parser(pathOne);
  const fileTwoParsed = parser(pathTwo);
  const ast = parse(fileOneParsed, fileTwoParsed);
  const formatter = formatters[format];
  return formatter ? formatter(ast) : null;
};

export default genDiff;
