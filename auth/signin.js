const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const saltRounds = 12;

//User Signup
exports.signup = localStrategy((user, email, password, done) => {
	if(user)
		return done(null, false);

	let newUser = new User();
	newUser._id = new mongoose.Types.ObjectId();
	newUser.local.email = email;
	return bcrypt.hash(password, saltRounds, (err, hash) => {
		newUser.local.password = hash;
		newUser.save(err => {
			if(err)
				return done(err);

			return done(null, newUser);
		});
	});
});

//User Login
exports.login = localStrategy((user, email, password, done) => {
	if(!user)
		return done(null, false);

	return bcrypt.compare(password, user.local.password, (err, result) => {
		if(err)
			return done(err);

		if(!result)
			return done(null, false);

		return done(null, user);
	});
});

function localStrategy(callback) {
	return new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, (req, email, password, done) => {
		process.nextTick(() => {
			//Sanitize user inputs
			let email = req.bodyEmail('email');
			let pass = req.bodyString('password');

			User.findOne({ 'local.email': email })
				.exec((err, user) => {
					if(err)
						return done(err);

					return callback(user, email, pass, done);
				});
		});
	});
}
