import _ from 'lodash';

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
        deleted: () => `Property '${propName}' was removed`,
        nested: () => `Property '${propName}' was updated. From [complex value] to [complex value]\n`
          + `${inner(node.children, propName)}`,
        changed: () => `Property '${propName}' was updated. From ${buildString('valueBefore')} to ${buildString('valueAfter')}`,
        unchanged: () => `Property '${propName}' wasn't changed`,
        added: () => `Property '${propName}' was added with value: ${buildString('valueAfter')}`,
      };
      return stringOptions[node.state]();
    };
    return currentAst.map(mapper).join('\n');
  };
  return inner(ast);
};

export default render;
