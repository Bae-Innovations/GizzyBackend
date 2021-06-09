const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');
const GizzySchema = require('../models/Gizzy');

const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

const searchGizzy = async (req, res) => {

  
    const { gizzy_name,lycano_type,descending_prize,page,limit } = req.query
   
    
    
    try{
        
        //find all the gizy sorting with price ascending 

        let collection = await GizzySchema.find().sort({
               gizzy_price: 1,
        }).limit(limit*1).skip((page-1)*limit)
        
        //find all the gizy sorting with price descending
        if(descending_prize){
            collection = await GizzySchema.find().sort({
                gizzy_price: -1,
            }).limit(limit*1).skip((page-1)*limit)
        }
        

        //find gizzy by lycanotype
        if(lycano_type){
            collection = await GizzySchema.find({
                lycano_type: lycano_type
            }).limit(limit*1).skip((page-1)*limit)
        }

        //find gizzy by lycanotype and descending prize sort
        if(lycano_type && descending_prize){
            collection = await GizzySchema.find({
                lycano_type: lycano_type
            }).sort({
                gizzy_price: -1,
            }).limit(limit*1).skip((page-1)*limit)
        }

        //find gizzy by the name
        if(gizzy_name){
            collection = await GizzySchema.find({
                gizzy_name: gizzy_name
            }).limit(limit*1).skip((page-1)*limit)
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

const mintGizzy = async (req, res) => {
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

}

module.exports = {
    searchGizzy,postCollection,postGizzy, deleteGizzy, mintGizzy
}