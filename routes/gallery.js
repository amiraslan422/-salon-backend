const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// Получить все изображения
router.get('/', async (req, res) => {
  try {
    const data = await Gallery.find();  // Извлекаем данные из MongoDB
    res.json(data);  // Отправляем результат
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

// Добавить новое изображение
router.post('/', async (req, res) => {
  try {
    const newImage = new Gallery(req.body);  // Создаём новый объект
    const saved = await newImage.save();  // Сохраняем в базе
    res.status(201).json(saved);  // Отправляем сохранённый объект
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при сохранении данных' });
  }
});

module.exports = router;
