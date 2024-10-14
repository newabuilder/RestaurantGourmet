// Importar el módulo express
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./DataAccess/database.js'); // Importa la conexión a la base de datos

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware para servir archivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'views')));


app.use('/api/restaurants', require('./controllers/restaurantController'));
app.use('/api/users', require('./controllers/userController'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

