// import * as _ from 'lodash';
import parser from './parsers';
import branchRender from './formatters/branch';
import plainRender from './formatters/plain';


const parse = (fileOneParsed, fileTwoParsed) => {
  const keysOne = Object.keys(fileOneParsed); // возможно, переписать на
  const keysTwo = Object.keys(fileTwoParsed); // obj.hasOwnProperty('propertyName')
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

const renderers = {
  branch: branchRender,
  plain: plainRender,
};

const genDiff = (pathOne, pathTwo, format = 'branch') => {
  const fileOneParsed = parser(pathOne);
  const fileTwoParsed = parser(pathTwo);
  const ast = parse(fileOneParsed, fileTwoParsed);
  const renderer = renderers[format];
  return renderers.hasOwnProperty(format) ? renderer(ast) : null;
};

export default genDiff;

// `${__dirname}/__fixtures__/before.yml`
// const fileOneParsed = parser(`/${__dirname}/${pathOne}`);
