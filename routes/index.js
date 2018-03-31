const usersRoutes = require('./users');

module.exports = (app) => {

	app.use('/users', usersRoutes);

	app.route('/').get((req, res) => {
		res.status(200).json({
			message: 'request received!'
		});
	});

	//Catch all unavailable routes
	app.use((req, res, next) => {
		const error = new Error('Not found');
		error.status = 404;
		next(error);
	});

	//Catch all other errors
	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
			error: {
				message: error.message
			}
		});
	});
};
