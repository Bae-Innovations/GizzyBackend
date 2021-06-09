const express = require('express');


const router = express.Router();

const {
    searchGizzy,
    postCollection,
    postGizzy,
    deleteGizzy,
    mintGizzy

} = require('../controllers/gizzyControllers')

router.get('/search', searchGizzy);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

router.post('gizzy/mint', mintGizzy);

module.exports = router;
