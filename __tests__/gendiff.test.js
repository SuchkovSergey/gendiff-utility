import genDiff from '../src';

const fs = require('fs');

const correctBranchDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityTest.txt`, 'utf-8');
const correctPlainDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityPlainTest.txt`, 'utf-8');
const correctJsonDiff = fs.readFileSync(`${__dirname}/__fixtures__/equalityJsonTest.txt`, 'utf-8');

const correctBranchDiffIniVersion = fs.readFileSync(`${__dirname}/__fixtures__/equalityTestINI.txt`, 'utf-8');
const correctPlainDiffIniVersion = fs.readFileSync(`${__dirname}/__fixtures__/equalityPlainTestINI.txt`, 'utf-8');
const correctJsonDiffIniVersion = fs.readFileSync(`${__dirname}/__fixtures__/equalityJsonTestINI.txt`, 'utf-8');

const beforeJson = `${__dirname}/__fixtures__/before.json`;
const afterJson = `${__dirname}/__fixtures__/after.json`;
const beforeYml = `${__dirname}/__fixtures__/before.yml`;
const afterYml = `${__dirname}/__fixtures__/after.yml`;
const beforeIni = `${__dirname}/__fixtures__/before.ini`;
const afterIni = `${__dirname}/__fixtures__/after.ini`;

test.each([
  [beforeJson, afterJson, correctBranchDiff],
  [beforeYml, afterYml, correctBranchDiff],
  [beforeIni, afterIni, correctBranchDiffIniVersion],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [beforeJson, afterJson, correctPlainDiff],
  [beforeYml, afterYml, correctPlainDiff],
  [beforeIni, afterIni, correctPlainDiffIniVersion],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [beforeJson, afterJson, correctJsonDiff],
  [beforeYml, afterYml, correctJsonDiff],
  [beforeIni, afterIni, correctJsonDiffIniVersion],
])('genDiff json %#', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
