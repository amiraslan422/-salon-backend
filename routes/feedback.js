const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Получить все отзывы
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения отзывов' });
  }
});

// Отправить отзыв
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: 'Заполните имя и сообщение' });
    }

    const newFeedback = new Feedback({ name, message });
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка отправки отзыва' });
  }
});

module.exports = router;
