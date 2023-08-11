const { isURL, isEmail } = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  linkValid,
  enValid,
  urlErrorText,
  emailErrorText,
} = require('../utils/constants');

module.exports.validationUrl = {
  validator: (v) => isURL(v),
  message: urlErrorText,
};

module.exports.validationEmail = {
  validator: (v) => isEmail(v),
  message: emailErrorText,
};

module.exports.validationChangeProfileData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.validationCreateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkValid),
    trailer: Joi.string().required().pattern(linkValid),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required().pattern(enValid),
    thumbnail: Joi.string().required().pattern(linkValid),
    movieId: Joi.string().required(),
  }),
});

module.exports.validationDeleteMovieData = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validationCreateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validationSigninData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});
