const express = require('express');
const upload = require('../config/multerConfig');
const handleMulterError = require('../middlewares/handleMulterError');
const {uploadDocument} = require('../controllers/docs');

const router = express.Router();

router.post('/upload-docs',upload, handleMulterError, uploadDocument);


module.exports = router;