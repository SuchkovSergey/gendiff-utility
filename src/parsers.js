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
  const func = parsers[extName];
  return func || null;
};

export default chooseParseFunc;
