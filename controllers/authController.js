const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};


const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create(email, hashedPassword);

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            userId: userId,
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ message: 'Error en el servidor al registrar usuario.' });
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: generateToken(user.id),
            userId: user.id,
            email: user.email,
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};