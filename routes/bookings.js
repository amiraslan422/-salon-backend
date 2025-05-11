const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Получить все записи
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('serviceId'); // если serviceId - ObjectId
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении записей' });
  }
});

// Создать новую запись
router.post('/', async (req, res) => {
  try {
    const { clientName, phone, serviceId, date, time } = req.body;

    if (!clientName || !phone || !serviceId || !date || !time) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const newBooking = new Booking({ clientName, phone, serviceId, date, time });
    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании записи', error });
  }
});

module.exports = router;
