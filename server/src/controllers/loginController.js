import connection from '../models/database.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { email, password } = req.body
  const consult = 'SELECT * FROM Credenciales WHERE email = ? AND password = ?'

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(consult, [email, password], (err, result) => {
        if (err) {
          console.error('Error en la consulta:', err)
          return reject(err)
        }
        resolve(result)
      })
    })

    console.log('Resultado de la consulta:', result)

    if (result.length > 0) {
      const user = result[0]
      console.log('Usuario encontrado:', user)

      const token = jwt.sign({ id: user.idUsuario, email: user.email, role: user.rol }, 'Stack', { expiresIn: '2h' })
      return res.status(200).send({ token, role: user.rol })
    } else {
      return res.status(401).send({ message: 'Credenciales inválidas' })
    }
  } catch (err) {
    console.error('Error interno del servidor:', err)
    return res.status(500).send({ message: 'Error interno del servidor' })
  }
}
