const router = require('express').Router();

router.post('/signup', (req, res, next) => {
	//to handle passport signup
	res.status(200).json({
		message: 'Signup successful!'
	});
});

router.post('/login', (req, res, next) => {
	//to handle passport login
	res.status(200).json({
		message: 'Login successful!'
	});
});

module.exports = router;
