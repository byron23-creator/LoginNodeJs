const { pool } = require('../config/db');

const User = {
    create: async (email, password) => {
        const [result] = await pool.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        return result.insertId;
    },
    findByEmail: async (email) => {
        const [rows] = await pool.execute(
            'SELECT id, email, password FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await pool.execute(
            'SELECT id, email FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },
    createTable: async () => {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabla "users" verificada/creada.');
    }
};

module.exports = User;