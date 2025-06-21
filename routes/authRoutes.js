const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middlewares/validateAuth');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);


module.exports = router;
