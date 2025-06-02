const User = require('../models/User');


const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const protectedRegisterUser = async (req, res) => {

  res.status(200).json({ message: 'Esta es una ruta de registro protegida, solo para administradores.' });
};


module.exports = { getUserProfile, protectedRegisterUser };