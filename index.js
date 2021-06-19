// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const {parameterGizzyAdd,sampleGizzyAdd} = require('./addgizzy')

const logger = require('./logger/logger');
// const authenticateToken = require('./middleware');

const ACCESS_TOKEN_SECRET = 'access123456789';

// initializations
const app = express();

const port = process.env.PORT || 8001;

// connecting to database
mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => logger.info('connected to DB!'));

// defining cors policy
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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

// requires admin access
app.use('/minting', require('./routes/minting'));
app.use('/admin', require('./routes/admin'));
// app.use('/collection', require('./routes/collection'));

// app.get('/delete', (async (req, res) => {
//   schema = require('./models/Egg')
//   schema.find({ownedBy:"0x471eCCb11dB0457c2dce4f10C66644268062CAf7"})
//   .then(async (asd) => {
//     asd.forEach(async (item) => {
//       await item.update({ownedBy:'null'})
      
//     })
//   })
  
//   res.send('done')
// }));

app.get('*', (req, res) => {
  logger.info('user route');
  res.send('App works!!!!');
});

// run the app
module.exports = app.listen(port, (err) => {
  logger.info(`running server from port:::::${port}`);
});

