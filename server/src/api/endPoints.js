// Importar el módulo express
import express from 'express'

// Importar los controladores

import { login } from '../controllers/loginController.js'
const router = express.Router()

// Definir las rutas

router.post('/login', login)

// Exportar el router
export default router
