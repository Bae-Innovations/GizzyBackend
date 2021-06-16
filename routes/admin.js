const express = require('express');
const multer = require('multer');
const onlyAdminMiddleware = require('../middlewares/onlyAdmin');

const router = express.Router();
// router.use(onlyAdminMiddleware);

const {
  registerAdmin,
  getAllUser,
  getAllGizzy,
  gizzyCoinFilter,
  giftGizzyCoin,
  viewPromoEmails,
  addPromoEmails,

} = require('../controllers/adminControllers');

router.post('/register', registerAdmin);
router.get('/users/all', getAllUser);
router.get('/gizzy/all', getAllGizzy);
router.get('/gizzycoins', gizzyCoinFilter);
router.post('/gizzycoins', giftGizzyCoin);
router.get('/promo-emails', viewPromoEmails);
router.post('/promo-emails', addPromoEmails);

module.exports = router;
