import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers';
import render from './formatters';

const buildInternalTree = (contentOne, contentTwo) => {
  const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));
  const customMap = (key) => {
    const name = key;
    if (!_.has(contentOne, key)) {
      return { name, state: 'added', valueAfter: contentTwo[key] };
    }
    if (!_.has(contentTwo, key)) {
      return { name, state: 'deleted', valueBefore: contentOne[key] };
    }
    if (_.isObject(contentOne[key]) && _.isObject(contentTwo[key])) {
      return { name, state: 'nested', children: buildInternalTree(contentOne[key], contentTwo[key]) };
    }
    if (contentOne[key] === contentTwo[key]) {
      return {
        name, state: 'unchanged', valueBefore: contentOne[key], valueAfter: contentTwo[key],
      };
    }
    return {
      name, state: 'changed', valueBefore: contentOne[key], valueAfter: contentTwo[key],
    };
  };
  return uniqKeys.map(customMap);
};

const parseContent = (currentPath) => {
  const format = path.extname(currentPath).slice(1);
  const data = fs.readFileSync(currentPath, 'utf-8');
  return parseData(format, data);
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const contentOne = parseContent(pathOne);
  const contentTwo = parseContent(pathTwo);
  const ast = buildInternalTree(contentOne, contentTwo);
  return render(formatName, ast);
};

export default genDiff;
