import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const formats = ['json', 'yml', 'ini'];
const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);

let expectedBranchDiff;
let expectedPlainDiff;
let expectedJSONDiff;

beforeAll(() => {
    expectedBranchDiff = fs.readFileSync(getFixturePath('equalityTest.txt'), 'utf-8');
    expectedPlainDiff = fs.readFileSync(getFixturePath('equalityPlainTest.txt'), 'utf-8');
    expectedJSONDiff = fs.readFileSync(getFixturePath('equalityJsonTest.txt'), 'utf-8');
});

test.each(formats)('genDiff branch-format %s', (format) => {
    const beforeFilePath = getFixturePath(`before.${format}`);
    const afterFilePath = getFixturePath(`after.${format}`);
    const actual = genDiff(beforeFilePath, afterFilePath);
    expect(actual).toBe(expectedBranchDiff);
});

test.each(formats)('genDiff plain-format %s', (format) => {
    const beforeFilePath = getFixturePath(`before.${format}`);
    const afterFilePath = getFixturePath(`after.${format}`);
    const actual = genDiff(beforeFilePath, afterFilePath, 'plain');
    expect(actual).toBe(expectedPlainDiff);
});

test.each(formats)('genDiff json-format %s', (format) => {
    const beforeFilePath = getFixturePath(`before.${format}`);
    const afterFilePath = getFixturePath(`after.${format}`);
    const actual = genDiff(beforeFilePath, afterFilePath, 'json');
    expect(actual).toBe(expectedJSONDiff);
});
