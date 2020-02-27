import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import dataParse from './parsers';
import dataFormat from './formatters';

const parse = (contentOne, contentTwo) => {
  const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));
  const customMap = (key) => {
    const name = key;
    if (!_.has(contentOne, key)) {
      return { name, currentState: 'added', valueAfter: contentTwo[key] };
    }
    if (!_.has(contentTwo, key)) {
      return { name, currentState: 'deleted', valueBefore: contentOne[key] };
    }
    if (contentOne[key] instanceof Object && contentTwo[key] instanceof Object) {
      return {
        name, currentState: 'changedInside', valueBefore: contentOne[key], valueAfter: contentTwo[key], children: parse(contentOne[key], contentTwo[key]),
      };
    }
    if (contentOne[key] === contentTwo[key]) {
      return {
        name, currentState: 'unchanged', valueBefore: contentOne[key], valueAfter: contentTwo[key],
      };
    }
    return {
      name, currentState: 'changedOutside', valueBefore: contentOne[key], valueAfter: contentTwo[key],
    };
  };
  return uniqKeys.map(customMap);
};

const parseContent = (currentPath) => {
  const format = path.extname(currentPath).slice(1);
  const data = fs.readFileSync(currentPath, 'utf-8');
  return dataParse(format, data);
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
  const contentOne = parseContent(pathOne);
  const contentTwo = parseContent(pathTwo);
  const ast = parse(contentOne, contentTwo);
  return dataFormat(formatName, ast);
};

export default genDiff;
