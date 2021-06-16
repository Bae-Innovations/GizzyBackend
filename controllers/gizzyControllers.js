const express = require('express');
const logger = require('../logger/logger');
const CollectionSchema = require('../models/Collection');
const UserSchema = require('../models/User');
const GizzySchema = require('../models/Gizzy');
const EmailSchema = require('../models/Email');
const addPromoGizzy = require('../utils_bkcn/addPromoGizzy')


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
    UserSchema.findOne({publicAddress: res.locals.publicAddress})
    .then((user) => {
        console.log("found the user inside the function")
        if (user == null){
            res.status(400).json({'message':'user not found'})
        } else {
            let email = user.email;
            EmailSchema.findOne({address:email})
            .then(async (email_list) => {
                if ( email_list != null){
                    console.log("email list is not null")
                    addPromoGizzy(res.locals.publicAddress)
                    .then(() => {
                        EmailSchema.deleteMany({address:email})
                        .then(() => res.json({won:true}))
                    }).catch((error) => console.log(error))
                    
                    
                } else {
                    console.log("email list null")
                    res.status(200).json({won:false})
                }
            })
            
        }
    })
    .catch((error) => {
        logger.debug(error);
    })

}

const ownedGizzy = async  (req, res) => {
    GizzySchema.find({ownedBy:res.locals.publicAddress}).then((result) => {
        res.json(result)
    });
}

const setGizzyName = async  (req, res) => {
    gizzyId = req.body.gizzyId;
    new_name = req.body.name;
    GizzySchema.updateOne({ownedBy:res.locals.publicAddress, gizzyId:gizzyId}, {gizzyName:new_name}).then((result) => {
        res.json({message:"gizzyName has been updated"})
    }).catch((err) => logger.error(err))
}

module.exports = {
    searchGizzy,postCollection,postGizzy, deleteGizzy, claimGizzy, ownedGizzy, setGizzyName
}