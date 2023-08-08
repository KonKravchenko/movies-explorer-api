const NotFoundError = require('../errors/not-found-err');

module.exports.pageNotFound = () => {
  throw new NotFoundError('Неверный путь');
};
