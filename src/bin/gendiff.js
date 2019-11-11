#!/usr/bin/env node
import genDiff from '..';

const program = require('commander');

program
  .version('0.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(genDiff(first, second)));

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
