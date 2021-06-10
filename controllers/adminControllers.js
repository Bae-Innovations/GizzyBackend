const { fromSigned } = require('ethereumjs-util');
const express = require('express');
const logger = require('../logger/logger');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin');

const fs = require('fs');


const registerAdmin = async (req, res) => {

    const publicAddress = req.body.publicAddress;
    const username = req.body.username;
    const email = req.body.email;
    logger.debug(publicAddress)

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

module.exports = {
    registerAdmin
}