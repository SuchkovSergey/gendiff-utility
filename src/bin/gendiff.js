#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
    .version('0.2.9')
    .arguments('<firstConfig> <secondConfig> [format]')
    .action((pathOne, pathTwo, format) => console.log(genDiff(pathOne, pathTwo, format)));

program
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format', 'branch');

program.parse(process.argv);
