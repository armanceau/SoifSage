const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 0,
  // },
  volume: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Drink = mongoose.model('Drink', drinkSchema);
module.exports = Drink;
