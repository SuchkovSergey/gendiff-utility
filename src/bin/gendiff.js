#!/usr/bin/env node

import lodash from 'lodash';

const fs = require('fs');
const program = require('commander');

const parser = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile));

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const fileOneParsed = parser(pathToFileOne); // это объект
  const fileTwoParsed = parser(pathToFileTwo);
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

  const reducerSecond = (acc, value) => ((!lodash.has(fileOneParsed, value))
    ? `${acc} + ${value}: ${fileTwoParsed[value]}\n`
    : acc);

  return console.log(`${keysTwo.reduce(reducerSecond, firstStep)}}`);
};

program
  .version('0.0.3')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => genDiff(first, second));

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

export default genDiff;
