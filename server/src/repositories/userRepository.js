import connection from '../models/database.js'
import crypto from 'crypto'

export class UserRepository {
  static async create ({ email, password }) {
    // 1. Validaciones de email
    if (typeof email !== 'string') throw new Error('Username must be a string')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) throw new Error('Invalid email format')

    // 2. Validaciones de password
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long')

    // Verificación de complejidad de la contraseña
    if (!/[A-Z]/.test(password)) throw new Error('Password must contain at least one uppercase letter')
    if (!/[a-z]/.test(password)) throw new Error('Password must contain at least one lowercase letter')
    if (!/[0-9]/.test(password)) throw new Error('Password must contain at least one number')
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) throw new Error('Password must contain at least one special character')

    // 3. Asegurarse que el username no exista
    const query = 'SELECT * FROM usuarios WHERE username = ?'
    return new Promise((resolve, reject) => {
      connection.query(query, [email], (err, results) => {
        if (err) {
          return reject(err)
        }
        if (results.length > 0) {
          return reject(new Error('Username already exists'))
        }

        const id = crypto.randomUUID()

        // 4. Insertar el nuevo usuario
        const insertQuery = 'INSERT INTO usuarios (id, email, contraseña) VALUES (?, ?, ?)'
        connection.query(insertQuery, [id, email, password], (insertErr, insertResult) => {
          if (insertErr) {
            return reject(insertErr)
          }
          resolve(id)
        })
      })
    })
  }
}
