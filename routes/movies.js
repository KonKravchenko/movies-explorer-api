const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkValid, enValid } = require('../utils/constants');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
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
    movieId: Joi.string().length(24).hex().required(),
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
