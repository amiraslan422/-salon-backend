require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Для чтения JSON из запросов

// Подключение маршрутов
const servicesRoutes = require('./routes/services');
const galleryRoutes = require('./routes/gallery');
const bookingsRoutes = require('./routes/bookings');
const adminsRoutes = require('./routes/admins');
const feedbackRoutes = require('./routes/feedback');
console.log('✅ Маршрут /api/bookings загружен');
app.use('/api/services', servicesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Успешное подключение к MongoDB');

    app.get('/', (req, res) => {
      res.send('Привет, Аnbb!');
    });

    app.listen(PORT, () =>
      console.log(`🚀 Сервер запущен на порту: ${PORT}`)
    );
  })
  .catch((error) => {
    console.error('❌ Ошибка подключения к MongoDB:', error);
  });
