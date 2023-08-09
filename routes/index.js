const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { pageNotFound } = require('../controllers/pageNotFound');

const auth = require('../middlewares/auth');

const { validationCreateUserData, validationSigninData } = require('../middlewares/validation');

const { signin, createUser, signout } = require('../controllers/users');

router.post('/signup', validationCreateUserData, createUser);

router.post('/signin', validationSigninData, signin);

router.post('/signout', signout);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', pageNotFound);

module.exports = router;
