import _ from 'lodash';

const processJson = (json, default_=[]) => {
  if (json=="null" || json=="") return default_;
  const obj = JSON.parse(json);
  return obj
};

const filterData = (array, match) => {
  let result = match != '' ? array.filter(item => item.toUpperCase().startsWith(match.toUpperCase())) : [];
  console.log('filterData', result, array, match);
  result = (result.length == 1 && result[0] == match) ? [] : result;
  return result.slice(0, 4);
};

const flatArray = (json) => {
  const obj = JSON.parse(json);
  const result = obj.map(item => item.x)
  return result;
};

module.exports = {
  processJson,
  filterData,
  flatArray
}
