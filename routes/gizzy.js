const express = require('express');
const logger = require('../logger/logger');
const Gizzy = require('../models/Gizzy');
const {
  getGizzy,
  postCollection,
  postGizzy, 
  deleteGizzy
} = require('../controllers/gizzyControllers')

const router = express.Router();

router.get('/', getGizzy);

module.exports = router;
