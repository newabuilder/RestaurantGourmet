// dataAccess/ReservaModel.js
const mongoose = require('mongoose');

// Definición del esquema de reservas en MongoDB
const ReservaSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    date: { type: Date, required: true },
    people: { type: Number, required: true },
});

const ReservaModel = mongoose.model('Reserva', ReservaSchema);

module.exports = ReservaModel;
