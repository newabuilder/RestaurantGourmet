import connection from '../models/database.js' // Importa la conexión a la base de datos
import jwt from 'jsonwebtoken' // Importa jsonwebtoken

export const login = (req, res) => {
  const { email, password } = req.body

  const consult = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?'

  try {
    connection.query(consult, [email, password], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error en la base de datos' })
      }
      if (result.length > 0) {
        const token = jwt.sign({ email }, 'Stack', {
          expiresIn: '3m'
        })

        return res.status(200).send({ token })
      } else {
        console.log('Usuario equivocado')
        return res.status(401).send({ message: 'Usuario equivocado' })
      }
    })
  } catch (err) {
    console.error(err) // Maneja el error de forma adecuada
    return res.status(500).send({ message: 'Error interno del servidor' })
  }
}
