// controllers/userController.js
const express = require('express')
const router = express.Router()
const User = require('../dataAccess/userModel') // Importa el modelo de datos de usuario

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body) // Lógica para crear el usuario
    res.status(201).json(newUser) // Responde con el nuevo usuario creado
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' }) // Maneja errores
  }
})

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', user })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

module.exports = router
