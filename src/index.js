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
    if (!_.has(fileTwoParsed, value)) {
      return `${acc} - ${strOne}`;
    }
    return (strOne === strTwo) ? `${acc}   ${strOne}` : `${acc} - ${strOne} + ${strTwo}`;
  };

  const reducerSecond = (acc, value) => {
    const strTwo = `${value}: ${fileTwoParsed[value]}\r\n`;
    return (!_.has(fileOneParsed, value)) ? `${acc} + ${strTwo}` : acc;
  };

  const firstStep = keysOne.reduce(reducerFirst, '{\r\n');
  const secondStep = keysTwo.reduce(reducerSecond, firstStep);

  return `${secondStep}}`;
};

export default genDiff;
