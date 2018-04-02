'use strict';

const User = require('../../models/users');
const localStrategy = require('./strategy/local');
const jwtStrategy = require('./strategy/jwt');

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('signup', localStrategy.signup);
	passport.use('login', localStrategy.login);

	passport.use('jwt', jwtStrategy.authenticate);

};
