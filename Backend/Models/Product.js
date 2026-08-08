const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['bags', 'cloth-storage', 'equipment'] 
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);