/* eslint-disable no-unused-vars */
// logoutController.js
import connection from '../models/database.js' // Importar conexión de base de datos
import jwt from 'jsonwebtoken'

export const logout = (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).send({ message: 'Token requerido' })
  }

  try {
    const decoded = jwt.verify(token, 'Stack') // Decodificar el token

    // Almacenar el token en la lista negra de la base de datos
    const insertQuery = 'INSERT INTO token_blacklist (token) VALUES (?)'
    connection.query(insertQuery, [token], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error al guardar el token en la lista negra' })
      }
      res.status(200).send({ message: 'Logout exitoso' })
    })
  } catch (error) {
    return res.status(401).send({ message: 'Token inválido o ya expirado' })
  }
}
