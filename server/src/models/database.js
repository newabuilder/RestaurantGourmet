import mysql from 'mysql2'

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'dPGvxplywaMWIaTxpoHkdmoOpMphAdGA',
  database: 'login',
  port: 33917
})

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack)
    return
  }
  console.log('Conectado a la base de datos como ID ' + connection.threadId)
})

export default connection
