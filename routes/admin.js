const express = require('express');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin')
const multer = require('multer');

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
    registerAdmin,
    getAllUser,
    gizzyCoinFilter,
    giftGizzyCoin

} = require('../controllers/adminControllers')

router.post('/register', registerAdmin);
router.post('users/all', getAllUser);
router.get('/gizzycoins', gizzyCoinFilter);
router.post('/gizzycoins', giftGizzyCoin);

module.exports = router;
