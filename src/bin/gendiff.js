#!/usr/bin/env node

import lodash from 'lodash';

const fs = require('fs');
const program = require('commander');

const parser = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile));

const genDiff = (pathOne, pathTwo) => {
  const fileOneParsed = parser(pathOne); // это объект
  const fileTwoParsed = parser(pathTwo);
  const keysOne = Object.keys(fileOneParsed);
  const keysTwo = Object.keys(fileTwoParsed);

  const reducerFirst = (acc, value) => {
    const strOne = `${value}: ${fileOneParsed[value]}\n`;
    const strTwo = `${value}: ${fileTwoParsed[value]}\n`;
    if (lodash.has(fileTwoParsed, value)) {
      if (fileOneParsed[value] === fileTwoParsed[value]) {
        return `${acc}   ${strOne}`;
      }
      return `${acc} - ${strOne} + ${strTwo}`;
    }
    return `${acc} - ${strOne}`;
  };

  const firstStep = keysOne.reduce(reducerFirst, '{\n');

  const reducerSecond = (acc, value) => (!lodash.has(fileOneParsed, value)
    ? `${acc} + ${value}: ${fileTwoParsed[value]}\n`
    : acc);

  return `${keysTwo.reduce(reducerSecond, firstStep)}}`;
};

program
  .version('0.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(genDiff(first, second)));

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

export default genDiff;
