import { UserRepository } from '../repositories/userRepository.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    // Aquí llamamos al repositorio para crear el usuario
    const id = await UserRepository.create({ email, password })

    // Si todo sale bien, se responde con el ID del nuevo usuario
    res.status(201).send({ id })
  } catch (error) {
    // Manejar los errores de manera específica y amigable
    if (error.message === 'Username already exists') {
      return res.status(409).send({ message: error.message })
    }

    // Otros errores
    return res.status(400).send({ message: error.message })
  }
}
