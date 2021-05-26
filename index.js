// imports
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger/logger');

// initializations
const app = express();
const port = 3070;

// connecting to database
mongoose.connect('mongodb+srv://gizzy:cftXDR456@cluster0.az372.mongodb.net/testdb?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => logger.info('connected to DB!'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.send('app works!!');
});

app.use('/user', require('./routes/user'));
app.use('/gizzy', require('./routes/gizzy'));
app.use('/collection', require('./routes/collection'));

app.get('*', (req, res) => {
  logger.info('user route');
  res.send('App works!!!!');
});

// run the app
app.listen(port, (err) => {
  logger.info(`running server from port:::::${port}`);
});
