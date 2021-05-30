// imports
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./logger/logger');
const authenticateToken = require('./middleware');

const ACCESS_TOKEN_SECRET = 'access123456789';

// initializations
const app = express();
var port = process.env.PORT || 8080;

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
module.exports = app.listen(port, (err) => {
  logger.info(`running server from port:::::${port}`);
});
