const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');

//Body validation
const bodyValidation = [
	check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
];

const passwordValidation = check('password').isLength({ min: 8 }).withMessage('Invalid password');

const callback = (req, res, next) => {
	//Validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() });
	}

	const path = req.path.match(/[a-zA-Z]+/g)[0];
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

			const query = querystring.stringify({
				message: path + ' successful',
				token: token
			});

			return res.redirect(200, '/?' + query);
		});
	})(req, res);
};

router.post('/login', [...bodyValidation, passwordValidation], callback);
router.post('/signup', [...bodyValidation, passwordValidation.custom((value, {req}) => {
	if(value !== req.body.passwordCheck)
		throw new Error('Passwords don\'t match');

	return value;
})], callback);


module.exports = router;
