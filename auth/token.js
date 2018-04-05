const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJwt} = passportJWT;
const User = require('../models/users');

exports.authenticate = new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromBodyField('token'),
	secretOrKey: process.env.JWT_KEY
}, (jwtPayload, done) => {
	process.nextTick(() => {
		User.findOne({ 'local.email': jwtPayload.email })
			.exec((err, user) => {
				if(err)
					return done(err);

				if(!user)
					return done(null, false);

				return done(null, user);
			});
	});
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
