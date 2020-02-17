import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const chooseParseFunc = (currentPath) => {
  const format = path.extname(currentPath);
  const parse = parsers[format];
  return parse || null;
};

export default chooseParseFunc;
