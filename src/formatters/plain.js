import _ from 'lodash';
import { STATE_TYPES } from '../constants';

const stringTypes = [
    {
        string: () => '[complex value]',
        check: (value) => value instanceof Object,
    },
    {
        string: (value) => `'${value}'`,
        check: (value) => typeof value === 'string',
    },
    {
        string: (value) => value,
        check: () => true,
    },
];

const render = (ast) => {
    const inner = (currentAst, currentPropName = '') => {
        const mapper = (node) => {
            const propName = _.trim(`${currentPropName}.${node.name}`, '.');
            const buildString = (valueType) => stringTypes
                .find(({ check }) => check(node[valueType]))
                .string(node[valueType]);

            const stringOptions = {
                [STATE_TYPES.DELETED]: () => `Property '${propName}' was removed`,
                [STATE_TYPES.NESTED]: () => inner(node.children, propName),
                [STATE_TYPES.CHANGED]: () => `Property '${propName}' was updated. From ${buildString('valueBefore')} to ${buildString('valueAfter')}`,
                [STATE_TYPES.UNCHANGED]: () => `Property '${propName}' wasn't changed`,
                [STATE_TYPES.ADDED]: () => `Property '${propName}' was added with value: ${buildString('valueAfter')}`,
            };
            return stringOptions[node.state]();
        };
        return currentAst.map(mapper).join('\n');
    };
    return inner(ast);
};

export default render;
