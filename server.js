const express = require('express');
const helmet = require('helmet');
const app = express();

const routes = require('./routes/routes');

app.use(helmet());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server starting on port', port);
});
