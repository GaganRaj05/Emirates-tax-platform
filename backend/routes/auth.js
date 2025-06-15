const express = require('express');
const {checkAuth, handleLogin, userSignUp, adminLogin, adminSignUp, consultantLogin, consultantSignUp} = require('../controllers/auth');
const router = express.Router();

router.post('/sign-in', handleLogin);
router.post('/sign-up', userSignUp);
router.get('/check-auth', checkAuth);
router.post('/admin-signup', adminSignUp)
router.post('/admin-signin', adminLogin);
router.post('/consultant-signup', consultantSignUp);
router.post('/consultant-signin', consultantLogin);


module.exports = router;
