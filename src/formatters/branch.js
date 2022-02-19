import _ from 'lodash';
import stringifyObject from '../utils';
import { STATE_TYPES } from '../constants';

const render = (abstractTree) => {
    const composeInnerData = (currentTree, depth) => {
        const startIndent = _.repeat(' ', depth * 4 + 2);
        const finishIndent = _.repeat(' ', depth * 4);
        const mapper = (node) => {
            const buildString = (valueType) => {
                const nodeElement = node[valueType];
                return _.isObject(nodeElement) ? stringifyObject(nodeElement, depth) : nodeElement;
            };

            const stringOptions = {
                [STATE_TYPES.DELETED]: () => `${startIndent}- ${node.name}: ${buildString('valueBefore')}`,
                [STATE_TYPES.NESTED]: () => `${startIndent}  ${node.name}: ${composeInnerData(node.children, depth + 1)}`,
                [STATE_TYPES.CHANGED]: () => `${startIndent}- ${node.name}: ${buildString('valueBefore')}\n`
                    + `${startIndent}+ ${node.name}: ${buildString('valueAfter')}`,
                [STATE_TYPES.UNCHANGED]: () => `${startIndent}  ${node.name}: ${buildString('valueBefore')}`,
                [STATE_TYPES.ADDED]: () => `${startIndent}+ ${node.name}: ${buildString('valueAfter')}`,
            };
            return stringOptions[node.state]();
        };
        const mappedTree = currentTree.map(mapper).join('\n');
        return `{\n${mappedTree}\n${finishIndent}}`;
    };
    return composeInnerData(abstractTree, 0);
};

export default render;
