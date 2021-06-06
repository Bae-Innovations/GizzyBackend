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
        gizzy_price: 123,
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

const parameterGizzyAdd = async(gizzyId,gizzyName,gizzyPrice,ownedBy,gizzyImage,gizzyStatus,generation,cooldownTime,
                                bio,hatched_by,birthday,lycanoType,attributesStrenth,attributesConstitution,attributesRestoration,
                                attributesCharisma,fatherId,motherId,children1) => {

    //added a new user 
    const parameterGizzy = {
        gizzy_id: gizzyId,
        gizzy_name: gizzyName,
        gizzy_price: gizzyPrice,
        owned_by: ownedBy,//owned by user id
        gizzy_image: gizzyImage,
        gizzy_status: gizzyStatus,
        genaration: generation,
        cooldown_time_hours: cooldownTime,
        bio: bio,
        hatched_by: hatched_by,//user id string,
        birthday: birthday,
        lycano_type: lycanoType,
        attributes: {
            strenth: attributesStrenth,
            constitution: attributesConstitution,
            restoration: attributesRestoration,
            charisma: attributesCharisma,
        },
        parents: {
            fatherId: fatherId,
            motherId: motherId,
        },
        children_list:[children1]
  
  }
  
  new GizzySchema(parameterGizzy).save()

  console.log('Parameters gizzy added')

  
  

}

module.exports = {
    sampleGizzyAdd,
    parameterGizzyAdd
}