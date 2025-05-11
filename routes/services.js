const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

console.log("📦 /api/services маршруты подключены");

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении услуг' });
  }
});

// POST /api/services
router.post('/', async (req, res) => {
  const { name, price, duration, description } = req.body;

  if (!name || !price || !duration || !description) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    const newService = new Service({ name, price, duration, description });
    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при сохранении услуги' });
  }
});

module.exports = router;
