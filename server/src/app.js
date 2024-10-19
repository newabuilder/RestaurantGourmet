// Importar el módulo express
const express = require('express');
const path = require('path');
const app = express();
const port =  3000;
const db = require('./models/database.js'); // Importa la conexión a la base de datos
const routes = require ('./api/endPoints.js');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [ "http://localhost:5173"],
    method: ["GET", "POST"]
}));  


app.use('/', routes); 


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

