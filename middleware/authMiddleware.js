const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;
            next();
        } catch (error) {
            console.error('Error en la verificación del token:', error.message);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión de nuevo.' });
            }
            res.status(401).json({ message: 'Token no válido. Acceso no autorizado.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No hay token. Acceso no autorizado.' });
    }
};

module.exports = { protect };