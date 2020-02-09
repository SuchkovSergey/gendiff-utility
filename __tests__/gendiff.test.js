import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathStart = `${__dirname}/__fixtures__/`;

const readTXTFile = (fileName) => fs.readFileSync(path.join(pathStart, `${fileName}.txt`), 'utf-8');

test.each([
  [`${pathStart}before.json`, `${pathStart}after.json`, readTXTFile('equalityTest')],
  [`${pathStart}before.yml`, `${pathStart}after.yml`, readTXTFile('equalityTest')],
  [`${pathStart}before.ini`, `${pathStart}after.ini`, readTXTFile('equalityTestINI')],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [`${pathStart}before.json`, `${pathStart}after.json`, readTXTFile('equalityPlainTest')],
  [`${pathStart}before.yml`, `${pathStart}after.yml`, readTXTFile('equalityPlainTest')],
  [`${pathStart}before.ini`, `${pathStart}after.ini`, readTXTFile('equalityPlainTestINI')],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [`${pathStart}before.json`, `${pathStart}after.json`, readTXTFile('equalityJsonTest')],
  [`${pathStart}before.yml`, `${pathStart}after.yml`, readTXTFile('equalityJsonTest')],
  [`${pathStart}before.ini`, `${pathStart}after.ini`, readTXTFile('equalityJsonTestINI')],
])('genDiff json %#', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
