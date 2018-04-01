const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/signup', (req, res, next) => {


	//to handle passport signup
	res.status(200).json({
		message: 'Signup successful!'
	});
});

router.post('/login', (req, res, next) => {

	passport.authenticate('login', { session: false }, (err, user, info) => {

		if(err || !user) {
			return res.status(400).json({
				message: 'invalid',
				user: user
			});
		}

		req.login(user, { session: false }, (err) => {
			if(err) res.send(err);

			const token = jwt.sign(user, process.env.JWT_KEY);
			return res.json({user, token});
		});

	})(req, res);
});

module.exports = router;
