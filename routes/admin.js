const express = require('express');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin')
const multer = require('multer');

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
    registerAdmin,
    getAllUser,
    gizzyCoinFilter,
    giftGizzyCoin,
    viewPromoEmails,
    addPromoEmails

} = require('../controllers/adminControllers')

router.post('/register', registerAdmin);
router.get('/users/all', getAllUser);
router.get('/gizzycoins', gizzyCoinFilter);
router.post('/gizzycoins', giftGizzyCoin);
router.get('/promo-emails', viewPromoEmails);
router.post('/promo-emails', addPromoEmails);

module.exports = router;
