const express = require('express');
const {checkAuth, handleLogin, userSignUp, adminLogin, adminSignUp, consultantLogin, consultantSignUp, getAccountInfo, updateUserInfo, handlePassowordUpdate} = require('../controllers/auth');
const router = express.Router();

router.post('/sign-in', handleLogin);
router.post('/sign-up', userSignUp);
router.get('/check-auth', checkAuth);
router.post('/admin-signup', adminSignUp)
router.post('/admin-signin', adminLogin);
router.post('/consultant-signup', consultantSignUp);
router.post('/consultant-signin', consultantLogin);
router.get('/get-account-info', getAccountInfo);
router.put('/update-user-info', updateUserInfo);
router.patch('/update-user-password',handlePassowordUpdate)
module.exports = router;
