import fs from 'fs';
import * as _ from 'lodash';
import chooseParseFunc from './parsers';
import chooseFormatFunc from './formatters/index';

const parse = (contentOne, contentTwo) => {
  const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));

  const reducer = (acc, key) => {
    const valueBefore = _.has(contentOne, key) ? contentOne[key] : '';
    const valueAfter = _.has(contentTwo, key) ? contentTwo[key] : '';
    const children = valueBefore instanceof Object && valueAfter instanceof Object
      ? parse(valueBefore, valueAfter) : [];
    const states = [
      { state: 'deleted', check: () => !_.has(contentTwo, key) },
      { state: 'added', check: () => !_.has(contentOne, key) },
      { state: 'changedInside', check: () => valueBefore instanceof Object && valueAfter instanceof Object },
      { state: 'changedObject', check: () => valueBefore instanceof Object || valueAfter instanceof Object },
      { state: 'unchanged', check: () => valueBefore === valueAfter },
      { state: 'changed', check: () => true },
    ];
    const currentState = states.find(({ check }) => check()).state;
    const root = {
      name: key,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };
    return [...acc, { ...root }];
  };

  return uniqKeys.reduce(reducer, []);
};

const parseContent = (path) => {
  const parseFunc = chooseParseFunc(path);
  return parseFunc(fs.readFileSync(path, 'utf-8'));
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const contentOne = parseContent(pathOne);
  const contentTwo = parseContent(pathTwo);
  const ast = parse(contentOne, contentTwo);
  const format = chooseFormatFunc(formatName); // 'format' means 'форматировать'
  return format(ast);
};

export default genDiff;
