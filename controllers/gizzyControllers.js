const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');
const UserSchema = require('../models/User');
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

const claimGizzy = async (req, res) => {
    // input theke i should be able to get the publicAddress
    // use the publicAddress to get the user from database
    // get user's email
    // use the email to check if they winner, 
    // if yes, remove email from list
        // mint a gizzy
        // wait for response 
        // send response je gizzy mint hoise and u winner
    // else
        // winner na hoile direct bolbe je loser haha

    UserSchema.findOne({publicAddress: req.publicAddress})
    .then((user) => {
        if (user == null){
            res.status(400).json({'message':'user not found'})
        } else {
            res.status(200).send();
        }
    })
    .catch((error) => {
        logger.debug(error);
    })

}

const ownedGizzy = async  (req, res) => {
    res.json({

    })
}

module.exports = {
    searchGizzy,postCollection,postGizzy, deleteGizzy, claimGizzy, ownedGizzy
}