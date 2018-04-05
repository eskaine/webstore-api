const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signin');
const verifyUser = require('../controllers/user');

router.post('/login', signinController);
router.post('/signup', signinController);
router.get('/profile', verifyUser, (req, res) => {
	res.status(200).json({
		message: 'successful'
	});
});

module.exports = router;
