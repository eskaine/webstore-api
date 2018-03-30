const express = require('express');
const app = express();

const routes = require('./routes/routes');

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server starting on port', port);
});
