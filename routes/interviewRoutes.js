const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/authMiddleware');
const { generateSession, getUserSessions, submitAnswer, getSessionById, deleteSession } = require('../controllers/interviewController');

router.post('/generate', requireAuth, generateSession);
router.get('/sessions', requireAuth, getUserSessions);
router.patch('/:sessionId/:questionIndex/answer', requireAuth, submitAnswer);
router.get('/session/:sessionId', requireAuth, getSessionById);
router.delete('/:sessionId', requireAuth, deleteSession);


module.exports = router;
