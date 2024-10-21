// business/ReservaService.js
// const ReservaModel = require('../dataAccess/ReservaModel');  // Capa de acceso a datos

class ReservaService {
  static async crearReserva (reservaData) {
    // Aquí irían reglas de negocio, como verificar disponibilidad
    return await ReservaModel.create(reservaData)
  }

  static async obtenerReservas (userId) {
    // Aquí iría la lógica para filtrar reservas según el usuario
    return await ReservaModel.find({ userId })
  }
}

module.exports = ReservaService
