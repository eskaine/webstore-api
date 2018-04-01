const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const saltRounds = 12;

module.exports = () => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, (req, email, password, done) => {
		process.nextTick(() => {
			User.find({ email: req.body.email })
				.exec((err, user) => {
					if(err)
						return done(err);

					if(!user) {
						let newUser = new User();
						newUser.local.email = req.body.email;
						bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
							newUser.local.password = hash;
							newUser.save(err => {
								if(err)
									return done(err);

								return done(null, newUser);
							});
						});
					}

				});
		});
	}));

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, (req, email, password, done) => {
		process.nextTick(() => {
			User.find({ 'local.email': req.body.email })
				.exec((err, user) => {
					if(err)
						return done(err);

					if(!user)
						return done(null, false);

					bcrypt.compare(password, user.local.password, (err, result) => {
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
