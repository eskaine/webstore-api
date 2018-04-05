const passport = require('passport');

module.exports = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if(err)
			return next(err);

		if(!user) {
			return res.redirect(401, '/login');
		}

		next();
	})(req, res);
};
