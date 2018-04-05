const passport = require('passport');
const querystring = require('querystring');
const token = require('../auth/token');
const { validationResult } = require('express-validator/check');

module.exports = (req, res, next) => {
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

			//Return a token if successful
			const query = querystring.stringify({
				message: path + ' successful',
				token: token.generate(user.local.email)
			});

			return res.redirect(200, '/?' + query);
		});
	})(req, res);
};
