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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Drink = mongoose.model('Drink', drinkSchema);
module.exports = Drink;
