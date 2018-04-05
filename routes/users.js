const express = require('express');
const router = express.Router();

const validate = require('../auth/validate');
const signinController = require('../controllers/signin');

router.post('/login', validate.login, signinController);
router.post('/signup', validate.signup, signinController);

module.exports = router;
