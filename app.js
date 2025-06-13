const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const User = require('./models/User'); 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

const startServer = async () => {
    await connectDB();
    await User.createTable(); 
};
startServer();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('API de Autenticación JWT en Node.js y MySQL');
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal en el servidor!' });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});