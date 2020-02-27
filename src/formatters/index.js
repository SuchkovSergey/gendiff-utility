import _ from 'lodash';
import branchFormatter from './branch';
import plainFormatter from './plain';
import jsonFormatter from './json';

const formatters = {
  branch: branchFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

const dataFormat = (currentFormat, ast) => {
  if (!_.has(formatters, currentFormat)) {
    throw new Error('Oh, formatter wasn\'t found :(');
  }
  return formatters[currentFormat](ast);
};

export default dataFormat;
