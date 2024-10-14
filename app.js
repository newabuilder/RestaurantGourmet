// Importar el módulo express
const express = require('express');
const app = express();
const port = 3000; 
const db = require('./DataAcces/database.js'); // Importa la conexión a la base de datos

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo para el login
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Obtén el username y password del cuerpo de la solicitud

    // Realiza una consulta a la base de datos
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            // Usuario encontrado
            res.send('Login exitoso');
        } else {
            // Usuario no encontrado
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

