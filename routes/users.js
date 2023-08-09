const router = require('express').Router();

const { getAuthUser, changeProfileData } = require('../controllers/users');
const { validationChangeProfileData } = require('../middlewares/validation');

router.get('/me', getAuthUser);
router.patch('/me', validationChangeProfileData, changeProfileData);

module.exports = router;
