import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathStart = `${__dirname}/__fixtures__/`;

const readTXTFile = (fileName) => fs.readFileSync(path.join(pathStart, `equality${fileName}.txt`), 'utf-8');
const pathConstruct = (name, format) => `${pathStart}${name}.${format}`;

test.each([
  [pathConstruct('before', 'json'), pathConstruct('after', 'json'), readTXTFile('Test')],
  [pathConstruct('before', 'yml'), pathConstruct('after', 'yml'), readTXTFile('Test')],
  [pathConstruct('before', 'ini'), pathConstruct('after', 'ini'), readTXTFile('TestINI')],
])('genDiff branch %#', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [pathConstruct('before', 'json'), pathConstruct('after', 'json'), readTXTFile('PlainTest')],
  [pathConstruct('before', 'yml'), pathConstruct('after', 'yml'), readTXTFile('PlainTest')],
  [pathConstruct('before', 'ini'), pathConstruct('after', 'ini'), readTXTFile('PlainTestINI')],
])('genDiff plain %#', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [pathConstruct('before', 'json'), pathConstruct('after', 'json'), readTXTFile('JsonTest')],
  [pathConstruct('before', 'yml'), pathConstruct('after', 'yml'), readTXTFile('JsonTest')],
  [pathConstruct('before', 'ini'), pathConstruct('after', 'ini'), readTXTFile('JsonTestINI')],
])('genDiff json %#', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
