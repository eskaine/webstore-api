const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false
	},
	function(email, password, done) {
		// ...
	}
	));

};
