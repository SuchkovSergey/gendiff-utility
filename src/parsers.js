import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const chooseParseFunc = (pathToFile) => {
  const extName = path.extname(pathToFile);
  const parseFunc = parsers[extName];
  return parseFunc || null;
};

export default chooseParseFunc;
