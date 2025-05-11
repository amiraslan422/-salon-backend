const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, serviceId, date, time } = req.body;

    if (!name || !phone || !serviceId || !date || !time) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const booking = new Booking({ name, phone, serviceId, date, time });
    await booking.save();

    res.status(201).json({ message: 'Запись успешно создана' });
  } catch (err) {
    console.error('Ошибка при создании записи:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
