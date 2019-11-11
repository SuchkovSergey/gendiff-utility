import genDiff from '../src/index';

const fs = require('fs');

test('genDiff JSON', () => {
  const jsonBefore = '__fixtures__/before.json';
  const jsonAfter = '__fixtures__/after.json';
  const equal = fs.readFileSync('__fixtures__/equalityTest.txt', 'utf-8');
  expect(String(genDiff(jsonBefore, jsonAfter)).trim()).toEqual(equal);
});
