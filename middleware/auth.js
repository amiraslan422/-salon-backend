const jwt = require('jsonwebtoken');

// Middleware для защиты маршрутов
const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Токен не предоставлен' });
  }

  try {
    // Удаляем "Bearer" из токена
    const bearerToken = token.split(' ')[1];

    // Проверка токена
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Добавляем данные из токена в запрос

    next(); // Переходим к следующему обработчику
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Недействительный токен' });
  }
};

module.exports = auth;
