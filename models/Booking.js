const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  phone: { type: String, required: true },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
