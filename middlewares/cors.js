/*eslint-disable*/
const allowedCors = [
  'https://localhost:3000',
  'https://localhost:3000/',
  'https://localhost:3000/sign-in',
  'https://localhost:3000/sign-up',
  'https://localhost:3000/main',
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost:3000/sign-in',
  'http://localhost:3000/sign-up',
  'http://localhost:3000/main',
  'https://konkravchenko.movies.nomoreparties.co'
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  console.log(req.headers);
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  next();
};
