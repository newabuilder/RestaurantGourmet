import bcrypt from 'bcryptjs'
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

    // Hash de la contraseña
    const saltRounds = 10 // Ajusta según tus necesidades
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Insertar nuevo usuario
    const insertQuery = 'INSERT INTO usuarios (id, email, contraseña) VALUES (?, ?, ?)'
    const values = [crypto.randomUUID(), email, hashedPassword]

    return new Promise((resolve, reject) => {
      connection.query(insertQuery, values, (error, results) => {
        if (error) {
          console.error('Error al crear el usuario:', error)
          if (error.code === 'ER_DUP_ENTRY') {
            reject(new Error('El correo electrónico ya está en uso'))
          } else {
            reject(new Error('Error al crear el usuario'))
          }
        } else {
          resolve(results.insertId)
        }
      })
    })
  }
}
