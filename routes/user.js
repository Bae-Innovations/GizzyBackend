const express = require('express');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const cryptographicCheck = require('../utils/cryptography')

const UserSchema = require('../models/User');
const ACCESS_TOKEN_SECRET = 'access123456789';
const REFRESH_TOKEN_SECRET = 'refresh123456789';

const router = express.Router();

router.post('/check', (req, res) => {
  // this route checks if a user already exists with the given publicAddress or not
  const publicAddress = req.body.publicAddress;
  const user = UserSchema.findOne({publicAddress: publicAddress}).then((user) => {
    if (user == null){
      res.status(400).json({'message':'user not found'})
    } else {
      res.status(200).json({'message': 'account with given public address exists'})
    }
  }).catch((error) => {
    logger.debug(error);
  })
});

router.post('/register', (req, res) => {
  const publicAddress = req.body.publicAddress;
  const username = req.body.username;
  const email = req.body.email;

  const nonce = Math.floor(Math.random()*10000000);

  const rand = function() {
    return Math.random().toString(36).substr(2)
  };

  const bearerToken = rand() + rand() + rand() + rand() + rand();

  // this routes creates a user
  const gizzy = new UserSchema({
    publicAddress: publicAddress,
    username: username,
    email: email,
    nonce: nonce,
    bearerToken: bearerToken
  })

  gizzy.save().then((result) => {
    res.json({'message':result})
  }).catch((error) => {
    res.json({'message':error})
  })
  
});

router.post('/login', (req, res) => {
  // receives a request with public address
  const publicAddress = req.body.publicAddress;

  // get user with given public address
  const user = UserSchema.findOne({publicAddress:publicAddress}).then((result) => {
    if (user == null){
      res.status(400).json({'message':'user not found'})
    } else {
      res.json({'message':user.nonce})
    }
  });
});


router.post('/authenticate', (req, res) => {
  // this route checks if sign is made by owner. if yes, give token
  // receives a request with public address
  // returns the bearer token
  const publicAddress = req.body.publicAddress;
  const signedNonce = req.body.signedNonce;

  UserSchema.findOne({publicAddress:publicAddress}).then((user) => {
    const nonce = user.nonce;
    cryptographicCheck(publicAddress, nonce, signedNonce).then((response) => {
      const bearerToken = user.bearerToken;
      res.json({'bearerToken':bearerToken})
    }).catch((error) => {
      logger.error(error);
      res.json(error);
    }).catch((error) => {
      logger.error(error);
      res.json(error)
    })
  });
});

module.exports = router;
