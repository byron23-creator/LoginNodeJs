const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); 

connectDB(); 

const app = express();

app.use(express.json()); 

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API de Autenticación con JWT');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});