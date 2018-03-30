const express = require('express');
const helmet = require('helmet');
const app = express();

const routes = require('./routes/index');

app.use(helmet());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server starting on port', port);
});

module.exports = app;
