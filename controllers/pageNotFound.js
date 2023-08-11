const { notFoundPathError } = require('../utils/constants');

module.exports.pageNotFound = () => {
  throw notFoundPathError;
};
