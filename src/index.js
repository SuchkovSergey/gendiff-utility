// import * as _ from 'lodash';
import parser from './parsers';

/*
const stringify = (str) => {
  const arrayOfSymbols = str.split('');
  const newArr = [];
  for (const symbol of arrayOfSymbols) {
    if (symbol !== '"') {
      newArr.push(symbol);
    }
  }
  return newArr.join('');
};
*/

const objStringify = (object, indent = '') => {
  const newIndent = `${indent}  `;
  const keys = Object.keys(object);
  const reducer = (acc, key) => {
    const strOne = `${newIndent}  ${key}: ${object[key]}\r\n`;
    return `${acc}  ${strOne}`;
  };
  const str = keys.reduce(reducer, '{\r\n');
  return `${str}${newIndent}}`;
};

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
    /*
    const currentStateVariations = {
      'deleted' : () => !keysTwo.includes(value),
      'changedInside': () => isBeforeObj && isAfterObj,
      'changedObj': () => isBeforeObj || isAfterObj,
      'unchanged': () => valueBefore === valueAfter,
      'changed': () => valueBefore !== valueAfter ,
    }
*/
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

const render = (ast, indent = '', indent1 = '') => {
  const newIndent = `${indent}  `;
  const reducerFirst = (acc, value) => {
    let strOne = '';
    let strTwo = '';
    const before = value.valueBefore instanceof Object
      ? objStringify(value.valueBefore, newIndent) : value.valueBefore;
    const after = value.valueAfter instanceof Object
      ? objStringify(value.valueAfter, newIndent) : value.valueAfter;
    const state = value.currentState;

    const strPlusAfter = `${newIndent}+ ${value.name}: ${after}\r\n`;
    const strMinusBefore = `${newIndent}- ${value.name}: ${before}\r\n`;
    const strUnchanged = `${newIndent}  ${value.name}: ${before}\r\n`;

    if (state === 'deleted') {
      strOne = strMinusBefore;
    }
    if (state === 'changedInside') {
      const indent2 = `${newIndent}  `;
      strOne = `${newIndent}  ${value.name}: ${render(value.children, indent2, indent2)}\r\n`;
    }
    if (state === 'changedObj' || state === 'changed') {
      strOne = strMinusBefore;
      strTwo = strPlusAfter;
    }
    if (state === 'unchanged') {
      strOne = strUnchanged;
    }
    if (state === 'added') {
      strTwo = strPlusAfter;
    }

    return `${acc}${strOne}${strTwo}`;
  };
  const renderedAST = `${ast.reduce(reducerFirst, '{\r\n')}${indent1}}`;

  return renderedAST;
};

const genDiff = (pathOne, pathTwo) => {
  const fileOneParsed = parser(pathOne);
  const fileTwoParsed = parser(pathTwo);
  const ast = parse(fileOneParsed, fileTwoParsed);
  const answer = render(ast);
  return answer;
};


export default genDiff;

// `${__dirname}/__fixtures__/before.yml`
// const fileOneParsed = parser(`/${__dirname}/${pathOne}`);
