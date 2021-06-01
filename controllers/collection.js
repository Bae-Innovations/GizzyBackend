const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');

const getCollection = async (req, res) => {

    const { gizzy_name } = req.query.gizzy_name
    const { lycano_type } = req.query.lycano_type
    const { descending_prize } = req.query.descending_prize
    try{
        //find all the gizzy 
        let collection = await CollectionSchema.find();

        //find all the gizy sorting with price ascending 
        if(!descending_prize){
            let collection = await CollectionSchema.find().sort({
                gizzy_price: 1,
            })
        }
        
        //find all the gizy sorting with price descending
        if(descending_prize){
            let collection = await CollectionSchema.find().sort({
                gizzy_price: -1,
            })
        }
        

        //find gizzy by lycanotype
        if(!lycano_type){
            let collection = await CollectionSchema.find({
                lycano_type: lycano_type
            })
        }

        //find gizzy by the name
        if(!gizzyName){
            let collection = await CollectionSchema.find({
                gizzy_name: gizzy_name
            })
        }

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