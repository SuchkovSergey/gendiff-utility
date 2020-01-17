import yaml from 'js-yaml';

const fs = require('fs');
const path = require('path');
const ini = require('ini');

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (pathToFile) => {
  const extname = path.extname(pathToFile);
  const parseFunc = parsers[extname];
  return parseFunc ? parseFunc(fs.readFileSync(pathToFile, 'utf-8')) : null;
};

export default parse;
