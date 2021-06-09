// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const {parameterGizzyAdd,sampleGizzyAdd} = require('./addgizzy')

const logger = require('./logger/logger');
const authenticateToken = require('./middleware');

const ACCESS_TOKEN_SECRET = 'access123456789';

// initializations
const app = express();

var port = process.env.PORT || 8080;

// connecting to database
mongoose.connect('mongodb+srv://gizzy:password@1234@cluster0.mujp0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => logger.info('connected to DB!'));

  //new gizzy add
  // sampleGizzyAdd()

  // parameterGizzyAdd('24vsfvsvs','rocky',433.456,'fewewfw','edvdvfdsvdvds','warmup',2,1,'ok gizzy cute gizzy','fsfc343dsad','01/06/20',
  //                    'cyberpunk',3,4,2,3,'42jhahdm','ds3223ed','child23ee2')

//defining cors policy
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
app.user('/mint', require('./routes/mint'));
app.use('/gizzy', require('./routes/gizzy'));
// app.use('/collection', require('./routes/collection'));

app.get('*', (req, res) => {
  logger.info('user route');
  res.send('App works!!!!');
});

// run the app
module.exports = app.listen(port, (err) => {
  logger.info(`running server from port:::::${port}`);
});
