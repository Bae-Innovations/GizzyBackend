const express = require('express');
const multer = require('multer');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
  addImageIPFS,
  addMetadataIPFS,
} = require('../controllers/mintingControllers');

router.post('/image', upload.single('image'), addImageIPFS);
router.post('/metadata', addMetadataIPFS);

module.exports = router;
