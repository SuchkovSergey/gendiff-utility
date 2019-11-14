import genDiff from '../src/index';

const fs = require('fs');
// const path = require('path');

const correctDiff = fs.readFileSync('__tests__/__fixtures__/equalityTest.txt', 'utf-8');

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctDiff],
])('genDiff %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});


/*
[`${__dirname}/__fixtures__/before.json`, '__tests__/__fixtures__/after.json', correctDiff],
[`${__dirname}/__fixtures__/before.yml`, '__tests__/__fixtures__/after.yml', correctDiff],
[`${__dirname}/__fixtures__/before.ini`, '__tests__/__fixtures__/after.ini', correctDiff],
*/
