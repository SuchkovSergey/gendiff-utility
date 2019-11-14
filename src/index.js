import * as _ from 'lodash';
import parser from './parsers';

const genDiff = (pathOne, pathTwo) => {
  const fileOneParsed = parser(pathOne);
  const fileTwoParsed = parser(pathTwo);
  const keysOne = Object.keys(fileOneParsed);
  const keysTwo = Object.keys(fileTwoParsed);

  const reducerFirst = (acc, value) => {
    const strOne = `${value}: ${fileOneParsed[value]}\r\n`;
    const strTwo = `${value}: ${fileTwoParsed[value]}\r\n`;
    if (_.has(fileTwoParsed, value)) {
      if (fileOneParsed[value] === fileTwoParsed[value]) {
        return `${acc}   ${strOne}`;
      }
      return `${acc} - ${strOne} + ${strTwo}`;
    }
    return `${acc} - ${strOne}`;
  };

  const reducerSecond = (acc, value) => (!_.has(fileOneParsed, value)
    ? `${acc} + ${value}: ${fileTwoParsed[value]}\r\n`
    : acc);

  const firstStep = keysOne.reduce(reducerFirst, '{\r\n');

  return `${keysTwo.reduce(reducerSecond, firstStep)}}`;
};

export default genDiff;
