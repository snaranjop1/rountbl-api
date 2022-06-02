const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const communityCtrl = require('../controllers/community.controller');

router.post(
    '/addMember',
    [authMiddleware.verifyJWT, authMiddleware.isAdmin],
    communityCtrl.addMember
);

router.get('/checkName/:name', communityCtrl.checkCommunityName);

module.exports = router;
