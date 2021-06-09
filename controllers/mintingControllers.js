const { fromSigned } = require('ethereumjs-util');
const express = require('express');
const logger = require('../logger/logger');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin');
const { create, globSource } = require('ipfs-http-client');
const client = create('https://ipfs.infura.io:5001')

const fs = require('fs');

//const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

const addImageIPFS = async (req, res) => {
    // takes in an image and adds it to the ipfs network
    image = req.file;
    logger.debug(Object.keys(req.file));
    logger.debug(image.destination);
    logger.debug(image.path);

    const { cid } = await client.add(globSource(image.path));
    res.json({'message':cid.toString()});

};

const addMetadataIPFS = async (req, res) => {
    // takes in bool, address, and meta
    owner = req.body.owner;
    breedable = req.body.breedable
    meta = req.body.meta

    const doc = JSON.stringify({
        owner: owner,
        breedable: breedable,
        meta: meta
    })

    const cid = await client.add(doc)
    res.json({'ipfs_hash': cid.path})
};

module.exports = {
    addImageIPFS, addMetadataIPFS
}