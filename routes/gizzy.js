const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
router.use(authenticateToken);

const {
  searchGizzy,
  postCollection,
  postGizzy,
  deleteGizzy,
  claimGizzy,
  ownedGizzy,

} = require('../controllers/gizzyControllers');

router.get('/search', searchGizzy);

router.post('/', postCollection);

router.post('/gizzy', postGizzy);

router.delete('/gizzy', deleteGizzy);

router.post('/claim', claimGizzy);

router.post('/owned', ownedGizzy);

module.exports = router;
