const express = require('express');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');

const UserSchema = require('../models/User');
const ACCESS_TOKEN_SECRET = 'access123456789';
const REFRESH_TOKEN_SECRET = 'refresh123456789';

const router = express.Router();

router.post('/register', async (req, res) => {
  // receives a request with public address
  const publicAddress = req.body.publicAddress;

  // get or create a user with given public address
  const filter = {publicAddress: publicAddress};
  const randomNumber = Math.floor(Math.random()*10000000)
  const update = {nonce:randomNumber};
  const user = await UserSchema.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true //add it if it doesnt exist yet
  });

  // return the nonce assosciated with the public address
  res.json({nonce:user.nonce});
});

router.post('/login', async (req, res) => {
  // receives a public address & signed nonce
  const publicAddress = req.body.publicAddress;
  const signedNonce = req.body.signedNonce;

  // get the user document
  try{
    const user = await UserSchema.findOne({publicAddress:publicAddress});
  }catch(err){
    logger.error(err);
    res.json({message:err});
  }

  // check if the signedNonce was signed using the private key of the publicAddress
  const msgBuffer = ethUtil.toBuffer(signedNonce);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  const signatureBuffer = ethUtil.toBuffer(signature);
  const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);

  if (address.toLowerCase() === publicAddress.toLowerCase()) {} else {
    return res
      .status(401)
      .send({ error: 'Signature verification failed' });
  }

  // if authentication is successful, create access token and refresh token
  const accessToken = jwt.sign({publicAddress: publicAddress}, ACCESS_TOKEN_SECRET, {expiresIn:'300s'});
  const refreshToken = jwt.sign({publicAddress: publicAddress}, REFRESH_TOKEN_SECRET);
  
  // save the refresh token in the user document and return both of the tokens
  user.refreshToken = refreshToken;
  try {
    await user.save()
    res.json({accessToken:accessToken, refreshToken: refreshToken});  
  } catch (err) {
    logger.error(err);
    res.json({message:err});
  }
});

router.post('/refresh', async (req, res) => {
  // accepts public address and refresh token
  const refreshToken = req.body.refreshToken;
  const publicAddress = req.body.publicAddress;

  // get the user document
  try{
    const user = await UserSchema.findOne({publicAddress:publicAddress});
  }catch(err){
    logger.error(err);
    res.json({message:err});
  }

  // check if refresh token match with the user
  if (user.refreshToken === refreshToken){} else {
    return res
      .status(401)
      .send({ error: 'Refresh token did not match' });
  }

  // create new access token and send in response
  const accessToken = jwt.sign({publicAddress: publicAddress}, ACCESS_TOKEN_SECRET, {expiresIn:'300s'});
  res.json({accessToken:accessToken});  
});

module.exports = router;
