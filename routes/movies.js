const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovieData, validationDeleteMovieData } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validationCreateMovieData, createMovie);
router.delete('/:id', validationDeleteMovieData, deleteMovie);

module.exports = router;
