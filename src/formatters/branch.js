import _ from 'lodash';
import objectStringify from '../utils';

const render = (ast) => {
    const inner = (currentAst, depth) => {
        const indent1 = _.repeat(' ', depth * 4 + 2);
        const indent2 = _.repeat(' ', depth * 4);
        const mapper = (node) => {
            const buildString = (valueType) => {
                const nodeElement = node[valueType];
                return _.isObject(nodeElement) ? objectStringify(nodeElement, depth) : nodeElement;
            };

            const stringOptions = {
                deleted: () => `${indent1}- ${node.name}: ${buildString('valueBefore')}`,
                nested: () => `${indent1}  ${node.name}: ${inner(node.children, depth + 1)}`,
                changed: () => `${indent1}- ${node.name}: ${buildString('valueBefore')}\n`
                    + `${indent1}+ ${node.name}: ${buildString('valueAfter')}`,
                unchanged: () => `${indent1}  ${node.name}: ${buildString('valueBefore')}`,
                added: () => `${indent1}+ ${node.name}: ${buildString('valueAfter')}`,
            };
            return stringOptions[node.state]();
        };
        const mapped = currentAst.map(mapper).join('\n');
        return `{\n${mapped}\n${indent2}}`;
    };
    return inner(ast, 0);
};

export default render;
