const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/users');

module.exports = () => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, (req, email, password, done) => {
		process.nextTick(() => {
			User.find({ email: req.body.email }, (err, user) => {
				if(err)
					return done(err);

				if(!user)
					return done(null, false);

				bcrypt.compare(password, user.password, (err, result) => {
					if(err)
						return done(err);

					if(!result)
						return done(null, false);

					return done(null, user);
				});
			});
		});
	}));

};
