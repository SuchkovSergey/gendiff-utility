import yaml from 'js-yaml';

const fs = require('fs');
const path = require('path');

const parsers = {
  '.json': (pathToFile) => JSON.parse(fs.readFileSync(pathToFile)),
  '.yml': (pathToFile) => yaml.safeLoad(fs.readFileSync(pathToFile)),
};

const parser = (pathToFile) => {
  const extname = path.extname(pathToFile);
  const parseFunc = parsers[extname];
  return parseFunc ? parseFunc(pathToFile) : null;
};

export default parser;
