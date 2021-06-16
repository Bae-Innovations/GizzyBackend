 // imports
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors')
 const GizzySchema = require('./models/Gizzy')
 const sampleGizzyAdd = async() => {
 
     //added a new user 
     const sampleGizzy = {
         gizzy_id: 'jnNKn7oMp',
         gizzy_name: 'new gizzy',
         owned_by: '67Mmpk8,',//owned by user id
         gizzy_image: 'selectedfiles',
         gizzy_status: 'ready',
         genaration: 1,
         cooldown_time_hours: 2,
         bio: 'This is the gizzy',
         hatched_by: 'bnk767VJnkk',//user id string,
         birthday: '11/11/11',
         lycano_type: 'cyberpunk',
         attributes: {
             strenth: 2,
             constitution: 3,
             restoration: 1,
             charisma: 3,
         },
         parents: {
             fatherId: '68nonio678nO&hnmo7nohmp',
             motherId: 'nmi&jhmMMMMIM89m890',
         },
         children_list: ['23wafaf23','2r2rwefwf23r','23r32r23rd']
   
   }
   
   new GizzySchema(sampleGizzy).save()
   console.log('Sample gizzy added')
 
   
   
 
 }
 
 const parameterGizzyAdd = async(gizzyId,gizzyName,ownedBy,gizzyImage,gizzyStatus,generation,breedable,cooldownIndex,
                                 bio,hatched_by,birthday,characteristics_list,lycanoType,attributesStrenth,attributesConstitution,attributesRestoration,
                                 attributesCharisma,fatherId,motherId,children_list) => {
 
     //added a new user 
     const parameterGizzy = {
         gizzy_id: gizzyId,
         gizzy_name: gizzyName,
         owned_by: ownedBy,//owned by user id
         gizzy_image: gizzyImage,
         gizzy_status: gizzyStatus,
         genaration: generation,
         breedable: breedable,
         cooldown_index: cooldownIndex,
         bio: bio,
         hatched_by: hatched_by,//publicAddress,
         birthday: birthday,
         characteristics: characteristics_list,
         lycano_type: lycanoType,
         attributes: {
             strength: attributesStrenth,
             constitution: attributesConstitution,
             restoration: attributesRestoration,
             charisma: attributesCharisma,
         },
         parents: {
             fatherId: fatherId,
             motherId: motherId,
         },
         children_list:children_list
   
   }
   
   new GizzySchema(parameterGizzy).save()
 
   console.log('Parameters gizzy added')
 
   
   
 
 }
 
 module.exports = {
     sampleGizzyAdd,
     parameterGizzyAdd
 }