const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères.'],
  },
  surname: {
    type: String,
    required: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères.'],
  },
  size: {
    type: Number,
    required: true,
    max: [272, 'D\'après nos sources, vous n\'êtes pas inscrit dans le Guinness, votre taille ne peut pas être supérieur à 272 centimètres.'],
  },
  weight : {
    type: Number,
    required: true,
    min: [40, 'Votre poids ne peut pas être inférieur de 40 kilogrammes.'],
  },
  age : {
    type: Number,
    required: true,
    min: [18, 'Cette application est destinée à un public majeur.'],
  },
  gender : {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;