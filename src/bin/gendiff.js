#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.2.6')
  .arguments('<firstConfig> <secondConfig> [format]')
  .action((first, second, format) => console.log(genDiff(first, second, format)));

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'branch');

program.parse(process.argv);
