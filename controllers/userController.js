const User = require('../models/User');


const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
        });
    } catch (error) {
        console.error('Error al obtener información del usuario:', error.message);
        res.status(500).json({ message: 'Error en el servidor al obtener información del usuario.' });
    }
};

module.exports = {
    getMe,
};