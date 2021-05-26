const express = require('express');
// const logger = require('../logger/logger');
const Collection = require('../models/Collection');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is the endpoint to search and filter collections');
});

router.post('/', (req, res) => {
  res.send('this is the endpoint to add new collection');
});

router.post('/gizzy', (req, res) => {
  res.send('this is the endpoint to add gizzy to collection');
});

router.delete('/gizzy', (req, res) => {
  res.send('this is the endpoint to remove gizzy from collection');
});

module.exports = router;
