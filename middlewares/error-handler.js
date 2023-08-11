/* eslint-disable no-unused-vars */
const { serverErrorText } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrorText
        : message,
    });
};

module.exports = errorHandler;
