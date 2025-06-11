const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', 
  });
};


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese todos los campos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario o el correo electrónico ya existen' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        message: 'Usuario registrado exitosamente',
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al registrar usuario' });
  }
};


const loginUser = async (req, res) => {
  const { identifier, password } = req.body; 

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese el identificador y la contraseña' });
  }

  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
  }
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); 

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};