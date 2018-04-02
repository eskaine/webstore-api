const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../../models/users');
const saltRounds = 12;

//User Signup
exports.signup = localStrategy((req, user, password, done) => {
	if(user)
		return done(null, false);

	let newUser = new User();
	newUser._id = new mongoose.Types.ObjectId();
	newUser.local.email = req.body.email;
	return bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		newUser.local.password = hash;
		newUser.save(err => {
			if(err)
				return done(err);

			return done(null, newUser);
		});
	});
});

//User Login
exports.login = localStrategy((req, user, password, done) => {
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
			User.findOne({ 'local.email': req.body.email })
				.exec((err, user) => {
					if(err)
						return done(err);

					return callback(req, user, password, done);
				});
		});
	});
}
