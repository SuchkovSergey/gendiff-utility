#!/usr/bin/env node
import genDiff from '..';

const program = require('commander');

program
  .version('0.1.8')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second, format) => console.log(genDiff(first, second, format)));

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'branch');

program.parse(process.argv);
