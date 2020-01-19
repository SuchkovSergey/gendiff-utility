import fs from 'fs';
import genDiff from '../src';

const pathStart = `${__dirname}/__fixtures__/`;
/*
let correct;
beforeEach((name) => {
  correct = fs.readFileSync(`${pathStart}${name}.txt`, 'utf-8');
});
*/

const readTXTFile = (fileName) => fs.readFileSync(`${pathStart}${fileName}.txt`, 'utf-8');

const beforeJson = `${pathStart}before.json`;
const afterJson = `${pathStart}after.json`;
const beforeYml = `${pathStart}before.yml`;
const afterYml = `${pathStart}after.yml`;
const beforeIni = `${pathStart}before.ini`;
const afterIni = `${pathStart}after.ini`;

test.each([
  [beforeJson, afterJson, readTXTFile('equalityTest')],
  [beforeYml, afterYml, readTXTFile('equalityTest')],
  [beforeIni, afterIni, readTXTFile('equalityTestINI')],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [beforeJson, afterJson, readTXTFile('equalityPlainTest')],
  [beforeYml, afterYml, readTXTFile('equalityPlainTest')],
  [beforeIni, afterIni, readTXTFile('equalityPlainTestINI')],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [beforeJson, afterJson, readTXTFile('equalityJsonTest')],
  [beforeYml, afterYml, readTXTFile('equalityJsonTest')],
  [beforeIni, afterIni, readTXTFile('equalityJsonTestINI')],
])('genDiff json %#', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
