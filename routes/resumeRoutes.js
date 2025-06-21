const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/wrapperUpload');
const { analyzeResume } = require('../controllers/resumeController');

router.post('/analyze', requireAuth, uploadMiddleware, analyzeResume);

module.exports = router;
