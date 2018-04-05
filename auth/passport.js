'use strict';

const User = require('../models/users');
const signin = require('./signin');
const token = require('./token');

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('signup', signin.signup);
	passport.use('login', signin.login);

	passport.use('jwt', token.authenticate);

};
