const { check } = require('express-validator/check');

const passwordValidation = check('password').isLength({ min: 8 }).withMessage('Invalid password');

//Body validation
const bodyValidation = [
	check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
];

const login = [...bodyValidation, passwordValidation];
const signup = [...bodyValidation, passwordValidation.custom((value, {req}) => {
	if(value !== req.body.passwordCheck)
		throw new Error('Passwords don\'t match');

	return value;
})];

module.exports = {
	signup: signup,
	login: login
};
