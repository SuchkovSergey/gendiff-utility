#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    firstConfigValue = firstConfig;
    secondConfigValue = secondConfig;
  });

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
