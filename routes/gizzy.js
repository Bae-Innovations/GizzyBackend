const express = require('express');


const router = express.Router();

const {
    searchGizzy,
    postCollection,
    postGizzy,
    deleteGizzy

} = require('../controllers/gizzyControllers')

router.get('/search', searchGizzy);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

module.exports = router;
