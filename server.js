const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const sanitize = require('sanitize');
const RateLimit = require('express-rate-limit');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes/index');
require('./auth/passport')(passport);

const limiter = new RateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	delayMs: 0
});

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(limiter);
app.use(sanitize.middleware);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'Put, POST, PATCH, DELETE, GET');
		return res.status(200).json();
	}
	next();
});

routes(app);


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server starting on port', port);
});

module.exports = app;
