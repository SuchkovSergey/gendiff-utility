import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const dataParse = (format, data) => {
  if (!_.has(parsers, format)) {
    throw new Error('Ooops, parser wasn\'t found :(');
  }
  return parsers[format](data);
};

export default dataParse;
