
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();


router.post(
    '/register',
    protect, 
    [
        body('email').isEmail().withMessage('Por favor, ingrese un email válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Por favor, ingrese un email válido'),
        body('password').notEmpty().withMessage('La contraseña es requerida'),
    ],
    loginUser
);

module.exports = router;