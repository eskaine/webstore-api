const usersRoutes = require('./users');

module.exports = (app) => {

	app.use('/users', usersRoutes);

	app.route('/').get((req, res) => {
		res.status(200).json({
			message: 'request received!'
		});
	});
};
