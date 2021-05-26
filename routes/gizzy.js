const express = require('express');
const logger = require('../logger/logger');
const Gizzy = require('../models/Gizzy');

const router = express.Router();

router.get('/', (req, res) => {
  logger.debug(req.body);
  res.send('this is the endpoint to search and filter gizzies');
});

module.exports = router;
