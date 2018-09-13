const { hasRequiredProperties } = require('./core');

const isValidSearch = (query) => {
  const required = ['passengers', 'insurance', 'bestFuel'];
  return hasRequiredProperties(query, required);
};

module.exports = {
  isValidSearch
};
