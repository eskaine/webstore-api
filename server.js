require('dotenv').load();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes/index');

mongoose.connect(process.env.MONGO_URI);

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
