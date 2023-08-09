// регулярные выражения для валидации
module.exports.linkValid = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/;
module.exports.enValid = /^[a-zA-Z]+/m;

// Ошибки
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbidenError = require('../errors/forbiden-err');
const NotFoundError = require('../errors/not-found-err');

// Вызов классов ошибок
const unauthorizedError = (item) => new UnauthorizedError(item);
const conflictingRequestError = (item) => new ConflictingRequestError(item);
const badRequestError = (item) => new BadRequestError(item);
const forbidenError = (item) => new ForbidenError(item);
const notFoundError = (item) => new NotFoundError(item);

// Экспортируемые ошибки с сообщением
module.exports.unauthorizedError = unauthorizedError('Неверный имя пользователя или пароль');
module.exports.badRequestCreateUserError = badRequestError('Некорректные имя пользователя, почты или пороля');
module.exports.conflictingRequestError = conflictingRequestError('Пользователь с таким Email уже зарегестрирован');
module.exports.badRequestDefaultError = badRequestError('Введены некорректые данные');
module.exports.badRequestCreateMovieError = badRequestError('Некорректые данные при создании карточки');
module.exports.notFoundMovieError = notFoundError('Фильм не найден');
module.exports.forbidenMovieError = forbidenError('У вас нет прав на удаление данного фильма');
module.exports.notFoundPathError = notFoundError('Неверный путь');
