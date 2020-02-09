import fs from 'fs';
import * as _ from 'lodash';
import chooseParseFunc from './parsers';
import chooseFormatFunc from './formatters/index';

const parse = (contentOne, contentTwo) => {
  const keysOne = Object.keys(contentOne);
  const keysTwo = Object.keys(contentTwo);
  const uniqKeys = _.uniq([...keysOne, ...keysTwo]);
  const ast = [];

  const reducer = (acc, key) => {
    const valueBefore = keysOne.includes(key) ? contentOne[key] : '';
    const valueAfter = keysTwo.includes(key) ? contentTwo[key] : '';
    const children = valueBefore instanceof Object && valueAfter instanceof Object
      ? parse(valueBefore, valueAfter) : [];

    const states = [
      { state: 'deleted', check: !keysTwo.includes(key) },
      { state: 'added', check: !keysOne.includes(key) },
      { state: 'changedInside', check: valueBefore instanceof Object && valueAfter instanceof Object },
      { state: 'changedObject', check: valueBefore instanceof Object || valueAfter instanceof Object },
      { state: 'unchanged', check: valueBefore === valueAfter },
      { state: 'changed', check: true },
    ];
    const currentState = states.find(({ check }) => check).state;

    const root = {
      name: key,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };

    return [...acc, { ...root }];
  };

  return uniqKeys.reduce(reducer, ast);
};

const parseContent = (pathToFile) => {
  const parseFunc = chooseParseFunc(pathToFile);
  return parseFunc(fs.readFileSync(pathToFile, 'utf-8'));
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const contentOne = parseContent(pathOne);
  const contentTwo = parseContent(pathTwo);
  const ast = parse(contentOne, contentTwo);
  const formatFunc = chooseFormatFunc(formatName);
  return formatFunc(ast);
};

export default genDiff;
