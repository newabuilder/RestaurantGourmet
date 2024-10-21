/* eslint-disable no-unused-vars */
import connection from '../models/database.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Consulta preparada para evitar inyección SQL
    const sql = 'SELECT * FROM Credenciales WHERE email = ?'
    const values = [email]

    const [rows, fields] = await connection.promise().query(sql, values)

    if (rows.length === 0) {
      return res.status(401).send({ message: 'Credenciales inválidas' })
    }

    const user = rows[0]

    // Comparación directa de contraseñas (INSEGURA)
    if (password !== user.password) {
      return res.status(401).send({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign({ id: user.idUsuario, email: user.email, role: user.rol }, 'Stack', { expiresIn: '2h' })
    return res.status(200).send({ token, role: user.rol })
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error)
    if (error.code === 'ER_NOT_FOUND') {
      return res.status(401).send({ message: 'Usuario no encontrado' })
    } else {
      return res.status(500).send({ message: 'Error interno del servidor' })
    }
  }
}
