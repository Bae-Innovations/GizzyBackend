// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

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

//defining cors policy
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())


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
