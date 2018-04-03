const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const passportCallback = (req, res, next) => {
	const path = req.route.path.match(/[a-zA-Z]+/g)[0];
	passport.authenticate(path, { session: false }, (err, user) => {
		if(err)
			return next(err);

		if(!user) {
			return res.status(400).json({
				message: 'invalid',
				user: user
			});
		}

		req.login(user, { session: false }, (err) => {
			if(err)
				res.send(err);

			const token = jwt.sign(
				{
					email: user.local.email
				},
				process.env.JWT_KEY,
				{ expiresIn: '1h' }
			);

			return res.status(200).json({
				message: 'Authentication successful',
				token: token
			});
		});
	})(req, res);
};

router.post('/signup', passportCallback);
router.post('/login', passportCallback);

module.exports = router;
