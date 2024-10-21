// Importar el módulo express
import express from 'express'

// Importar los controladores
import { login } from '../controllers/loginController.js'
import { register } from '../controllers/registerController.js'
import { logout } from '../controllers/logoutController.js'
import { protectedRoute } from '../controllers/protectedController.js'

// Crear una instancia de Router
const router = express.Router()

// Definir las rutas
router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.post('/protected', protectedRoute)

// Exportar el router
export default router
