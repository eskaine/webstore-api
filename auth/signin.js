const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const saltRounds = 12;

//User Signup
exports.signup = localStrategy(async (user, email, password, done) => {
	if(user)
		return done(null, false);

	const newUser = new User();
	newUser._id = new mongoose.Types.ObjectId();
	newUser.local.email = email;
	newUser.local.password = await bcrypt.hash(password, saltRounds).catch(err => done(err));
	newUser.save(err => {
		if(err)
			return done(err);

		return done(null, newUser);
	});
});

//User Login
exports.login = localStrategy(async (user, email, password, done) => {
	if(!user)
		return done(null, false);

	const result = await bcrypt.compare(password, user.local.password).catch(err => done(err));

	if(!result)
		return done(null, false);

	return done(null, user);
});

function localStrategy(callback) {
	return new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, async (req, email, password, done) => {
		const user = await User.findOne({ 'local.email': email }).catch(err => done(err));
		
		return callback(user, email, password, done);
	});
}
