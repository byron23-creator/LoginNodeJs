const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', protect, registerUser); 
router.get('/profile', protect, getProfile);

module.exports = router;