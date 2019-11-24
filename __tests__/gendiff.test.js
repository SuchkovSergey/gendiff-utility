import genDiff from '../src/index';

const fs = require('fs');
// const path = require('path');

const correctBranchDiff = fs.readFileSync('__tests__/__fixtures__/equalityTest.txt', 'utf-8');
const correctPlainDiff = fs.readFileSync('__tests__/__fixtures__/equalityPlainTest.txt', 'utf-8');

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctBranchDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctBranchDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctBranchDiff],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctPlainDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctPlainDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctPlainDiff],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});


/*
[`${__dirname}/__fixtures__/before.json`, '__tests__/__fixtures__/after.json', correctBranchDiff],
[`${__dirname}/__fixtures__/before.yml`, '__tests__/__fixtures__/after.yml', correctBranchDiff],
[`${__dirname}/__fixtures__/before.ini`, '__tests__/__fixtures__/after.ini', correctBranchDiff],
*/
