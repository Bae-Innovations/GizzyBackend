const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');
const UserSchema = require('../models/User');
const GizzySchema = require('../models/Gizzy');
const EmailSchema = require('../models/Email');

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

    UserSchema.findOne({publicAddress: req.publicAddress})
    .then((user) => {
        if (user == null){
            res.status(400).json({'message':'user not found'})
        } else {
<<<<<<< HEAD
            let email = user.email;
            if (EmailSchema.find(address=email) != ""){
                // make the blockchain call
                // remove from databae
                EmailSchema.deleteMany(address=email)
                .then(() => res.send("won the gizzy"))
                .catch(() => res.send("error happened"))
            } else {
                res.status(401).send("did not win any gizzy")
            }
=======
            res.status(200).send();
>>>>>>> 7d8ada47840a8011efa2a088b6a27c71579cd55d
        }
    })
    .catch((error) => {
        logger.debug(error);
    })
<<<<<<< HEAD
=======

}

const ownedGizzy = async  (req, res) => {
    res.json({

    })
>>>>>>> 7d8ada47840a8011efa2a088b6a27c71579cd55d
}

module.exports = {
    searchGizzy,postCollection,postGizzy, deleteGizzy, claimGizzy, ownedGizzy
}