import os from 'os';
import _ from 'lodash';
import objectStringify from '../utils';

const render = (ast) => {
  const inner = (currentAst, depth) => {
    const indent1 = _.repeat(' ', depth * 4 + 2);
    const indent2 = _.repeat(' ', depth * 4);
    const mapper = (node) => {
      const buildString = (valueType) => {
        const nodeElement = node[valueType];
        return nodeElement instanceof Object ? objectStringify(nodeElement, depth) : nodeElement;
      };

      const stringOptions = {
        deleted: () => `${indent1}- ${node.name}: ${buildString('valueBefore')}`,
        nested: () => `${indent1}  ${node.name}: ${inner(node.children, depth + 1)}`,
        changed: () => `${indent1}- ${node.name}: ${buildString('valueBefore')}${os.EOL}`
          + `${indent1}+ ${node.name}: ${buildString('valueAfter')}`,
        unchanged: () => `${indent1}  ${node.name}: ${buildString('valueBefore')}`,
        added: () => `${indent1}+ ${node.name}: ${buildString('valueAfter')}`,
      };
      return stringOptions[node.state]();
    };
    const mapped = currentAst.map(mapper).join(os.EOL);
    return ['{', os.EOL, mapped, os.EOL, indent2, '}'].join('');
  };
  return inner(ast, 0);
};

export default render;
