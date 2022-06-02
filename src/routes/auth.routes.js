const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const communityMiddleware = require('../middlewares/community.middleware');

router.post('/register', communityMiddleware.isCommunityNameAvailable, authCtrl.createCommunity);
router.post('/login', authCtrl.loginCommunity);
router.get('/logout', authCtrl.logoutCommunity);
router.get('/isAuth', authMiddleware.verifyJWT, authCtrl.isAuth);

module.exports = router;
