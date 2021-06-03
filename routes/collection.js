const express = require('express');


const router = express.Router();

const {
    getGizzy,
    postCollection,
    postGizzy,
    deleteGizzy

} = require('../controllers/gizzyControllers')

router.get('/', getGizzy);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

module.exports = router;
