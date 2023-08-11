const jwt = require('jsonwebtoken');
const { SECRET_STRING } = require('../utils/config');
const { authTokenError } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw authTokenError;
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    throw authTokenError;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
