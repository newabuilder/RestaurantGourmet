// Importar modulos necesarios
import express from 'express';
import { PORT } from './config.js';
import path from 'path';
import connection from './models/database.js'; // Importa la conexión a la base de datos
import routes from './api/endPoints.js';
import cors from 'cors';    


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
}));

// Rutas
app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
