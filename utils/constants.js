// регулярные выражения для валидации
module.exports.linkValid = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/;
module.exports.enValid = /^[a-zA-Z0-9]+/m;

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

// текст сообщений
module.exports.urlErrorText = 'Неправильный формат ссылки на постер к фильму';
module.exports.emailErrorText = 'Неправильный формат почты';
module.exports.rateLimitErrorText = { message: 'Превышен лимит запросов. Попробуйте еще раз позже.' };
module.exports.serverErrorText = 'На сервере произошла ошибка';
module.exports.deleteMovieMessage = 'Фильм удалён';
module.exports.signoutMessageText = 'Выход';
const authErrorText = 'Необходима авторизация';
const userNamePassErrorText = 'Неверный имя пользователя или пароль';
const badRequestCreateUserErrorText = 'Некорректные имя пользователя, почты или пороля';
const conflictingRequestErrorText = 'Пользователь с таким Email уже зарегестрирован';
const badRequestDefaultErrorText = 'Введены некорректые данные';
const badRequestCreateMovieErrorText = 'Некорректые данные при создании карточки';
const notFoundMovieErrorText = 'Фильм не найден';
const forbidenMovieErrorText = 'У вас нет прав на удаление данного фильма';
const notFoundPathErrorText = 'Неверный путь';

// Экспортируемые ошибки с сообщением
module.exports.unauthorizedError = unauthorizedError(userNamePassErrorText);
module.exports.authTokenError = unauthorizedError(authErrorText);
module.exports.badRequestCreateUserError = badRequestError(badRequestCreateUserErrorText);
module.exports.conflictingRequestError = conflictingRequestError(conflictingRequestErrorText);
module.exports.badRequestDefaultError = badRequestError(badRequestDefaultErrorText);
module.exports.badRequestCreateMovieError = badRequestError(badRequestCreateMovieErrorText);
module.exports.notFoundMovieError = notFoundError(notFoundMovieErrorText);
module.exports.forbidenMovieError = forbidenError(forbidenMovieErrorText);
module.exports.notFoundPathError = notFoundError(notFoundPathErrorText);
