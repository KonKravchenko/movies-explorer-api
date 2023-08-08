const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { pageNotFound } = require('../controllers/404');

const auth = require('../middlewares/auth');

const {
  signin, createUser, signout,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), signin);

router.post('/signout', signout);

router.use('*', pageNotFound);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
