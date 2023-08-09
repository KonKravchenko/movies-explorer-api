const Movie = require('../models/movie');

const {
  badRequestCreateMovieError,
  notFoundMovieError,
  forbidenMovieError,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = { _id: req.user.id };
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(badRequestCreateMovieError);
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movie) => {
      res.send({ movie });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  const userId = req.user.id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw notFoundMovieError;
      } else if (movie.owner.toString() === userId) {
        Movie.findByIdAndRemove(movieId)
          .then((data) => {
            res
              .status(200)
              .send({ data, message: 'Фильм удалён' });
          })
          .catch(next);
      } else {
        throw forbidenMovieError;
      }
    })
    .catch(next);
};
