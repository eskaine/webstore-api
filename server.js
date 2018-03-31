const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const routes = require('./routes/index');

app.use(helmet());
app.use(morgan('dev'));

routes(app);


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server starting on port', port);
});

module.exports = app;
