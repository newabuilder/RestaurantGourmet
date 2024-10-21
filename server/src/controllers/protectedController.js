import jwt from 'jsonwebtoken'

export const protectedRoute = (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).send({ message: 'Token requerido' })
  }

  try {
    const decoded = jwt.verify(token, 'Stack') // Decodifica el token
    // Puedes añadir cualquier lógica adicional que desees para una ruta protegida
    res.status(200).send({ message: 'Acceso concedido', user: decoded })
  } catch (error) {
    return res.status(401).send({ message: 'Token inválido o expirado' })
  }
}
