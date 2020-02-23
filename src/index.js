import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import chooseParse from './parsers';
import chooseFormat from './formatters';

const stateOptions = [
  {
    state: 'deleted',
    check: (_valueBefore, valueAfter) => valueAfter === null,
  },
  {
    state: 'added',
    check: (valueBefore) => valueBefore === null,
  },
  {
    state: 'changedInside',
    check: (valueBefore, valueAft) => valueBefore instanceof Object && valueAft instanceof Object,
  },
  {
    state: 'unchanged',
    check: (valueBefore, valueAfter) => valueBefore === valueAfter,
  },
  {
    state: 'changedOutside',
    check: () => true,
  },
];

const parse = (contentOne, contentTwo) => {
  const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));
  const customMap = (key) => {
    const valueBefore = _.has(contentOne, key) ? contentOne[key] : null;
    const valueAfter = _.has(contentTwo, key) ? contentTwo[key] : null;
    const isValuesAreObjects = valueBefore instanceof Object && valueAfter instanceof Object;
    const children = isValuesAreObjects ? parse(valueBefore, valueAfter) : [];
    const currentState = stateOptions.find(({ check }) => check(valueBefore, valueAfter)).state;
    return {
      name: key,
      currentState,
      valueBefore,
      valueAfter,
      children,
    };
  };
  return uniqKeys.map(customMap);
};

const parseContent = (currentPath) => {
  const extention = path.extname(currentPath);
  const dataParse = chooseParse(extention);
  return dataParse(fs.readFileSync(currentPath, 'utf-8'));
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const contentOne = parseContent(pathOne);
  const contentTwo = parseContent(pathTwo);
  const ast = parse(contentOne, contentTwo);
  const format = chooseFormat(formatName);
  return format(ast);
};

export default genDiff;
