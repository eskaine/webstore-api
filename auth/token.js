const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJwt} = passportJWT;
const User = require('../models/users');

exports.authenticate = new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	secretOrKey: process.env.JWT_KEY
}, async (jwtPayload, done) => {
	const user = await User.findOne({ 'local.email': jwtPayload.email }).catch(err => done(err));

	if(!user)
		return done(null, false);

	return done(null, user);
});

exports.generate = (email) => {
	return jwt.sign(
		{
			email: email
		},
		process.env.JWT_KEY,
		{ expiresIn: '1h' }
	);
};
