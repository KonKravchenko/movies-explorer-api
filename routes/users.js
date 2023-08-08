const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getAuthUser, changeProfileData } = require('../controllers/users');

router.get('/me', getAuthUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
}), changeProfileData);

module.exports = router;
