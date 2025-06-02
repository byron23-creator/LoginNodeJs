const express = require('express');
const { getUserProfile, protectedRegisterUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.post('/protected-register', protect, protectedRegisterUser);

module.exports = router;