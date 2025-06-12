const express = require('express');
const {checkAuth, handleLogin, userSignUp} = require('../controllers/auth');
const router = express.Router();

router.post('/sign-in', handleLogin);
router.post('/sign-up', userSignUp);
router.get('/check-auth', checkAuth);

module.exports = router;
