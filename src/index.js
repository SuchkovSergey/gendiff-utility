import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers';
import render from './formatters';
import { STATE_TYPES } from './constants';

const buildAbstractTree = (contentOne, contentTwo) => {
    const uniqKeys = _.union(_.keys(contentOne), _.keys(contentTwo));
    const customMap = (key) => {
        let levelData;
        if (!_.has(contentOne, key)) {
            levelData = {
                state: STATE_TYPES.ADDED,
                valueAfter: contentTwo[key],
            };
        } else if (!_.has(contentTwo, key)) {
            levelData = {
                state: STATE_TYPES.DELETED,
                valueBefore: contentOne[key],
            };
        } else if (_.isObject(contentOne[key]) && _.isObject(contentTwo[key])) {
            levelData = {
                state: STATE_TYPES.NESTED,
                children: buildAbstractTree(contentOne[key], contentTwo[key]),
            };
        } else if (contentOne[key] === contentTwo[key]) {
            levelData = {
                state: STATE_TYPES.UNCHANGED,
                valueBefore: contentOne[key],
                valueAfter: contentTwo[key],
            };
        } else {
            levelData = {
                state: STATE_TYPES.CHANGED,
                valueBefore: contentOne[key],
                valueAfter: contentTwo[key],
            };
        }
        return { name: key, ...levelData };
    };
    return uniqKeys.map(customMap);
};

const parseContent = (currentPath) => {
    const format = path.extname(currentPath).slice(1);
    const fileContent = fs.readFileSync(currentPath, 'utf-8');
    return parseData(format, fileContent);
};

const genDiff = (pathOne, pathTwo, formatName = 'branch') => {
    const contentOne = parseContent(pathOne);
    const contentTwo = parseContent(pathTwo);
    const abstractTree = buildAbstractTree(contentOne, contentTwo);
    return render(formatName, abstractTree);
};

export default genDiff;
