import branchFormatter from './branch';
import plainFormatter from './plain';
import jsonFormatter from './json';

const formatters = {
  branch: branchFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

const chooseFormatFunc = (currentFormat) => formatters[currentFormat] || null;

export default chooseFormatFunc;
