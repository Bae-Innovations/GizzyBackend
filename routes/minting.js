const express = require('express');


const router = express.Router();

const {
    addImageIPFS,
    addMetadataIPFS

} = require('../controllers/mintingControllers')

router.post('/image', addImageIPFS);
router.post('/metadata', addMetadataIPFS);

module.exports = router;
