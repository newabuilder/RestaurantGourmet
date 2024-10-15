// controllers/ReservaController.js
const express = require('express');
const router = express.Router();
const ReservaService = require('../business/ReservaService');  // Lógica de negocio

// Ruta para crear una nueva reserva
app.post('/reservas', async (req, res) => {
    const { restaurantId, userId, date, people } = req.body;
    
    try {
        const reserva = await ReservaService.crearReserva({ restaurantId, userId, date, people });
        res.status(201).json({ message: 'Reserva creada exitosamente', reserva });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});


// Ruta para obtener las reservas de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const reservas = await ReservaService.obtenerReservas(req.params.userId);
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

module.exports = router;
