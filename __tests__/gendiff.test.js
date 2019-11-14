import genDiff from '../src/index';

const fs = require('fs');

const correctDiff = fs.readFileSync('__tests__/__fixtures__/equalityTest.txt', 'utf-8');

test('genDiff JSON', () => {
  const jsonBefore = `${__dirname}/__fixtures__/before.json`;
  const jsonAfter = '__tests__/__fixtures__/after.json';
  expect(genDiff(jsonBefore, jsonAfter)).toEqual(correctDiff);
});

test('genDiff YAML', () => {
  const yamlBefore = `${__dirname}/__fixtures__/before.yml`;
  const yamlAfter = '__tests__/__fixtures__/after.yml';
  expect(genDiff(yamlBefore, yamlAfter)).toEqual(correctDiff);
});
