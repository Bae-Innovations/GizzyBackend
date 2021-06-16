// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GizzySchema = require('../models/Gizzy');
const logger = require('../logger/logger');

const addGizzy = async (gizzyId, gizzyName, ownedBy, gizzyImage, gizzyStatus, generation, breedable, cooldownIndex,
  bio, hatchedBy, createdAt, characteristics_list, lycanoType, attributesStrenth, attributesConstitution, attributesRestoration,
  attributesCharisma, sireId, matronId, childrenList) => {

  const gizzyObj = {
    gizzyId: gizzyId,
    gizzyName: gizzyName,
    ownedBy: ownedBy, // owned by user id
    gizzyImage: gizzyImage,
    gizzyStatus: gizzyStatus,
    generation: generation,
    breedable: breedable,
    cooldownIndex: cooldownIndex,
    bio: bio,
    hatchedBy: hatchedBy, // publicAddress,
    createdAt: createdAt,
    characteristics: characteristics_list,
    lycanoType: lycanoType,
    attributes: {
      strength: attributesStrenth,
      constitution: attributesConstitution,
      restoration: attributesRestoration,
      charisma: attributesCharisma,
    },
    parents: {
      sireId,
      matronId,
    },
    childrenList: childrenList,

  };
  new GizzySchema(gizzyObj).save()
  .then((result) => {
    logger.info(result)
  })
  .catch((err) => logger.error(err))
  //console.log('Parameters gizzy added');
};


module.exports = addGizzy

