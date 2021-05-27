const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        let collection = await CollectionSchema.find();
        res.json(collection);
    }catch(err){
        res.json({message:err})
    }
});

router.post('/', async (req, res) => {
    let collection = new CollectionSchema({
        name: req.body.name
    })
    try {
        const savedCollection = await collection.save();
        res.json(savedCollection);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/gizzy', (req, res) => {
  res.send('this is the endpoint to add gizzy to collection');
});

router.delete('/gizzy', (req, res) => {
  res.send('this is the endpoint to remove gizzy from collection');
});

module.exports = router;
