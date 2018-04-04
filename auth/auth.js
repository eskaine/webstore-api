const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJwt} = passportJWT;
const User = require('../models/users');

module.exports = new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
