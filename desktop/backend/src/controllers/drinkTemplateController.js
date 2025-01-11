const DrinkTemplate = require('../models/DrinkTemplate');

const getDrinkTemplates = async (req, res) => {
  try {
    const drinks = await DrinkTemplate.find();
    res.status(200).json(drinks);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = {
    getDrinkTemplates,
};