const express = require('express');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin')
const multer = require('multer');

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
    registerAdmin
} = require('../controllers/adminControllers')

router.post('/register', registerAdmin);

module.exports = router;
