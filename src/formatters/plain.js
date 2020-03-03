// import os from 'os';

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
  const inner = (currentAst, currentPropName = null) => {
    const mapper = (node) => {
      const propertyName = (currentPropName === null) ? `${node.name}` : `${currentPropName}.${node.name}`;
      const buildString = (valueType) => stringTypes
        .find(({ check }) => check(node[valueType]))
        .string(node[valueType]);

      const stringOptions = {
        deleted: () => `Property '${propertyName}' was removed`,
        nested: () => `Property '${propertyName}' was updated. From ${buildString('valueBefore')} to ${buildString('valueAfter')}\r\n`// os.EOL
          + `${inner(node.children, propertyName)}`,
        changed: () => `Property '${propertyName}' was updated. From ${buildString('valueBefore')} to ${buildString('valueAfter')}`,
        unchanged: () => `Property '${propertyName}' wasn't changed`,
        added: () => `Property '${propertyName}' was added with value: ${buildString('valueAfter')}`,
      };
      return stringOptions[node.state]();
    };
    return currentAst.map(mapper).join('\r\n'); // \r\n os.EOL
  };
  return inner(ast);
};

export default render;
