import _ from 'lodash';
import branchFormatter from './branch';
import plainFormatter from './plain';
import jsonFormatter from './json';

const formatters = {
  branch: branchFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

const render = (format, ast) => {
  if (_.has(formatters, format)) {
    return formatters[format](ast);
  }
  throw new Error(`Oh, ${format}-format wasn't found :(`);
};

export default render;
