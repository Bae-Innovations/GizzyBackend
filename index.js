const express = require('express');
const logger = require('./logger/logger');

const app = express();
const port = 3070;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('App works!!');
});

app.use('/api', require('./routes/routes'));

// request to handle undefined or all other routes
app.get('*', (req, res) => {
  logger.info('user route');
  res.send('App works!!!!');
});

app.listen(port, (err) => {
  logger.info(`running server from port:::::${port}`);
});
