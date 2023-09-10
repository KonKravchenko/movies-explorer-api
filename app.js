const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const errorHandler = require('./middlewares/error-handler');

const app = express();

const router = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');
const { limiter } = require('./middlewares/rateLimiter');

app.use(cors);

mongoose.connect(DB);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// app.use(limiter);

app.use(requestLogger);// подключаем логгер запросов

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Сервер запущен!', SERVER_PORT);
});
