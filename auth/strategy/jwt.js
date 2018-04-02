const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJWT} = passportJWT;
const User = require('../../models/users');

exports.authenticate = new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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
