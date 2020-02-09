import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathStart = `${__dirname}/__fixtures__/`;
const readTXTFile = (fileName) => {
  const pathToFile = path.join(pathStart, `equality${fileName}.txt`);
  return fs.readFileSync(pathToFile, 'utf-8');
};
const pathConstruct = (name, format) => `${pathStart}${name}.${format}`;

// сократил количество тестов с 9 до 3,
// так как в данном случае проверяется как работа парсеров для каждого типа файла,
// так и каждый вариант вывода дифа
test.each([
  [pathConstruct('before', 'json'), pathConstruct('after', 'json'), readTXTFile('Test'), 'branch'],
  [pathConstruct('before', 'yml'), pathConstruct('after', 'yml'), readTXTFile('PlainTest'), 'plain'],
  [pathConstruct('before', 'ini'), pathConstruct('after', 'ini'), readTXTFile('JsonTestINI'), 'json'],
])('genDiff %#', (a, b, expected, format) => {
  expect(genDiff(a, b, format)).toBe(expected);
});
