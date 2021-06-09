const express = require('express');

const router = express.Router();

const {
    mintGizzy

} = require('../controllers/mintController')

router.get('/search', searchGizzy);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

module.exports = router;
