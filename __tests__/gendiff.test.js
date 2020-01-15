import genDiff from '../src';

const fs = require('fs');
// const path = require('path');

const correctBranchDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityTest.txt`, 'utf-8');
const correctPlainDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityPlainTest.txt`, 'utf-8');
const correctJsonDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityJsonTest.txt`, 'utf-8');

const correctINIBranchDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityTestINI.txt`, 'utf-8');
const correctINIPlainDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityPlainTestINI.txt`, 'utf-8');
const correctINIJsonDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityJsonTestINI.txt`, 'utf-8');

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctBranchDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctBranchDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctINIBranchDiff],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctPlainDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctPlainDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctINIPlainDiff],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`, correctJsonDiff],
  [`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`, correctJsonDiff],
  [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`, correctINIJsonDiff],
])('genDiff json %#', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
