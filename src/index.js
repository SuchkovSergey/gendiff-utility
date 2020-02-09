import fs from 'fs';
import * as _ from 'lodash';
import chooseParseFunc from './parsers';
import chooseFormatFunc from './formatters/index';

const parse = (firstFile, secondFile) => { // naming
  const keysOne = Object.keys(firstFile);
  const keysTwo = Object.keys(secondFile);
  const keys = [...keysOne, ...keysTwo];
  const uniqKeys = _.uniq(keys);
  const ast = [];

  const reducerFirst = (acc, key) => {
    const valueBefore = keysOne.includes(key) ? firstFile[key] : '';
    const valueAfter = keysTwo.includes(key) ? secondFile[key] : '';
    const isBeforeObj = valueBefore instanceof Object;
    const isAfterObj = valueAfter instanceof Object;
    const children = isBeforeObj && isAfterObj ? parse(valueBefore, valueAfter) : [];

    const states = [
      {
        state: 'deleted',
        check: () => !keysTwo.includes(key),
      },
      {
        state: 'added',
        check: () => !keysOne.includes(key),
      },
      {
        state: 'changedInside',
        check: () => isBeforeObj && isAfterObj,
      },
      {
        state: 'changedObj',
        check: () => isBeforeObj || isAfterObj,
      },
      {
        state: 'unchanged',
        check: () => valueBefore === valueAfter,
      },
      {
        state: 'changed',
        check: () => true,
      },
    ];

    const getState = () => {
      const object = states.find(({ check }) => check());
      return object.state;
    };

    const currentState = getState();

    const root = {
      name: key,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };
    return [...acc, { ...root }];
  };

  return uniqKeys.reduce(reducerFirst, ast);
};

const parseFile = (pathToFile) => {
  const parseFunc = chooseParseFunc(pathToFile);
  return parseFunc(fs.readFileSync(pathToFile, 'utf-8'));
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const firstFile = parseFile(pathOne);
  const secondFile = parseFile(pathTwo);
  const ast = parse(firstFile, secondFile);
  const formatFunc = chooseFormatFunc(formatName);
  return formatFunc(ast);
};

export default genDiff;
