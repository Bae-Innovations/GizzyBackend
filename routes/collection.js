const express = require('express');


const router = express.Router();

const {
    getCollection,
    postCollection,
    postGizzy,
    deleteGizzy

} = require('../controllers/collection')

router.get('/', getCollection);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

module.exports = router;
