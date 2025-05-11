const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
