import * as _ from 'lodash';

const fs = require('fs');

const parser = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile));

const genDiff = (pathOne, pathTwo) => {
  const fileOneParsed = parser(pathOne); // это объект
  const fileTwoParsed = parser(pathTwo);
  const keysOne = Object.keys(fileOneParsed);
  const keysTwo = Object.keys(fileTwoParsed);

  const reducerFirst = (acc, value) => {
    const strOne = `${value}: ${fileOneParsed[value]}`;
    const strTwo = `${value}: ${fileTwoParsed[value]}`;
    if (_.has(fileTwoParsed, value)) {
      if (fileOneParsed[value] === fileTwoParsed[value]) {
        return `${acc}   ${strOne}\n`;
      }
      return `${acc} - ${strOne}\n + ${strTwo}\n`;
    }
    return `${acc} - ${strOne}\n`;
  };

  const reducerSecond = (acc, value) => (!_.has(fileOneParsed, value)
    ? `${acc} + ${value}: ${fileTwoParsed[value]}\n`
    : acc);

  const firstStep = keysOne.reduce(reducerFirst, '{\n');

  return `${keysTwo.reduce(reducerSecond, firstStep)}}`;
};

export default genDiff;
