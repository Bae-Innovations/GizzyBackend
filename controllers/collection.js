const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');

const getCollection = async (req, res) => {
    try{
        let collection = await CollectionSchema.find();
        res.json(collection);
    }catch(err){
        logger.error(err);
        res.json({message:err})
    }
}


const postCollection = async (req, res) => {
    let collection = new CollectionSchema({
        name: req.body.name
    })
    try {
        const savedCollection = await collection.save();
        res.json(savedCollection);
    } catch (err) {
        logger.error(err);
        res.json({message: err});
    }
}

const postGizzy = async (req, res) => {
    res.send('this is the endpoint to add gizzy to collection');
}

const deleteGizzy = async  (req, res) => {
    res.send('this is the endpoint to remove gizzy from collection');
}

module.exports = {
    getCollection,postCollection,postGizzy, deleteGizzy
}