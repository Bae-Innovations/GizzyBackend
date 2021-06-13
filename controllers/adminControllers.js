const { fromSigned } = require('ethereumjs-util');
const express = require('express');
const logger = require('../logger/logger');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin');

const registerAdmin = async (req, res) => {

    const publicAddress = req.body.publicAddress;
    const username = req.body.username;
    const email = req.body.email;
    logger.debug(publicAddress);

    const nonce = Math.floor(Math.random()*10000000);

    const rand = function() {
        return Math.random().toString(36).substr(2)
    };

    const bearerToken = rand() + rand() + rand() + rand() + rand();

    UserSchema.findOne()

    // this routes creates a user
    const user = new UserSchema({
        publicAddress: publicAddress,
        username: username,
        email: email,
        nonce: nonce,
        bearerToken: bearerToken,
        isAdmin: true
    })

    user.save().then((result) => {
        logger.debug("user has been created")
        logger.debug(Object.keys(result))
        res.json({'message':result})
    }).catch((error) => {
        logger.debug("an error occured while created user")
        logger.debug(Object.keys(error))
        logger.debug(error._message)
        logger.debug(Object.keys(error.errors))
        res.json({'message':error})
    })
};

const getAllUser = async (req, res) => {
    const user = UserSchema.findAll().then((result) => {
    return_list = []

    if (result == null){
        res.status(400).json({'message':'an error occured'})
    } else {
        result.forEach((user)=>{
            return_user = {
                publicAddress: user.publicAddress,
                email: user.email,
                username: user.username,
                gizzyCoin: user.gizzyCoin
            }
            return_list.push(return_user)
        })
        res.json(return_list)
    }
    });
}

const gizzyCoinFilter = async (req, res) => {
    // get who has how much gizzycoin?
    logger.debug("entering gizzycoinfilter");
};

const giftGizzyCoin = async (req, res) => {
    const publicAddress = req.body.publicAddress;
    const amount = req.body.amount;

    // get the user object
    const user = UserSchema.findOne({publicAddress: publicAddress}).then((user) => {
        if (user == null){
          res.status(400).json({'message':'user not found'})
        } else {
          user.gizzyCoin += amount;
          user.save()
          .then((result) => {res.json({
            publicAddress: user.publicAddress,
            username: user.username,
            email: user.email,
            gizzyCoin: user.gizzyCoin
          })})
          .catch((error) => {res.status(400).json({'message':error})})
        }
      }).catch((error) => {
        logger.debug(error);
      })
    // change value of user and respond back
};

module.exports = {
    registerAdmin, getAllUser, gizzyCoinFilter, giftGizzyCoin
}