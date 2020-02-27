import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import dataParse from './parsers';
import dataFormat from './formatters';

// const stateOptions = [
//   {
//     state: 'deleted',
//     check: (_valueBefore, valueAfter) => valueAfter === null,
//   },
//   {
//     state: 'added',
//     check: (valueBefore) => valueBefore === null,
//   },
//   {
//     state: 'changedInside',
//     check: (valueBe, valueAft) => valueBefore instanceof Object && valueAft instanceof Object,
//   },
//   {
//     state: 'unchanged',
//     check: (valueBefore, valueAfter) => valueBefore === valueAfter,
//   },
//   {
//     state: 'changedOutside',
//     check: () => true,
//   },
// ];

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


// const parse = (contentOne, contentTwo) => {
//   const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));
//
//   const customMap = (key) => {
//     const root = {
//       name: key,
//       currentState: null,
//       valueBefore: _.has(contentOne, key) ? contentOne[key] : null,
//       valueAfter: _.has(contentTwo, key) ? contentTwo[key] : null,
//       children: null,
//     };
//
//     const areValuesObjects = root.valueBefore instanceof Object
//       && root.valueAfter instanceof Object;
//     root.children = areValuesObjects ? parse(root.valueBefore, root.valueAfter) : [];
//
//     if (!_.has(contentOne, key)) {
//       root.currentState = 'added';
//     } else if (!_.has(contentTwo, key)) {
//       root.currentState = 'deleted';
//     } else if (areValuesObjects) {
//       root.currentState = 'changedInside';
//     } else if (root.valueBefore === root.valueAfter) {
//       root.currentState = 'unchanged';
//     } else {
//       root.currentState = 'changedOutside';
//     }
//
//     return root;
//   };
//   return uniqKeys.map(customMap);
// };
