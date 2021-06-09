const express = require('express');
const logger = require('../logger/logger');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin')

const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

const mintGizzy = async (req, res) => {
    

}

const addImageIPFS = async (req, res) => {
    // takes in an image and adds it to the ipfs network
    image = req.files[0]


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

    const cid = await ipfs.add(doc)
    res.json({'ipfs_hash': cid})
};

module.exports = {
    addImageIPFS, addMetadataIPFS
}