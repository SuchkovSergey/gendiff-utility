import _ from 'lodash';

const stringifyObject = (object, depth) => {
    const startIndent = _.repeat(' ', depth * 4 + 8);
    const finishIndent = _.repeat(' ', depth * 4 + 4);
    const currentString = Object
        .entries(object)
        .map(([key, value]) => `${startIndent}${key}: ${value}`)
        .join('\n');
    return `{\n${currentString}\n${finishIndent}}`;
};

export default stringifyObject;
