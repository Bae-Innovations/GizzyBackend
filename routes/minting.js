const express = require('express');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage})

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
    addImageIPFS,
    addMetadataIPFS
} = require('../controllers/mintingControllers')

router.post('/image',upload.single('image'), addImageIPFS);
router.post('/metadata', addMetadataIPFS);

module.exports = router;
