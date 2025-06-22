const express = require('express');
const upload = require('../config/multerConfig');
const handleMulterError = require('../middlewares/handleMulterError');
const {uploadDocument, fetchConsultantDocs, fetchDocuments, assignDocument, uploadTaxReport, fetchUserDocs, fetchPreviouslyUploadedDocs} = require('../controllers/docs');

const router = express.Router();

router.post('/upload-docs',upload, handleMulterError, uploadDocument);
router.get('/tax-reports', fetchUserDocs);
router.get('/fetch-docs', fetchDocuments);
router.get('/fetch-tax-docs', fetchConsultantDocs);
router.post('/upload-tax-report', upload, handleMulterError, uploadTaxReport);
router.post('/assign-docs', assignDocument);
router.get('/fetch-previous-docs', fetchPreviouslyUploadedDocs);

module.exports = router;