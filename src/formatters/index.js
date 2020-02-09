import branchRender from './branch';
import plainRender from './plain';
import jsonRender from './json';

const formatters = {
  branch: branchRender,
  plain: plainRender,
  json: jsonRender,
};

const chooseFormatFunc = (currentFormat) => formatters[currentFormat] || null;

export default chooseFormatFunc;
