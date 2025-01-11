const Drink = require('../models/Drink');
const DrinkTemplate = require ('../models/DrinkTemplate');

const addDrink = async (req, res) => {
  try {
    const { drinkTemplateId, customVolume } = req.body;
    const userId = req.user.id;

    const drinkTemplate = await DrinkTemplate.findById(drinkTemplateId);
    if (!drinkTemplate) {
      return res.status(404).json({ message: 'Boisson introuvable' });
    }    

    const volume = customVolume || drinkTemplate.defaultVolume;

    const drink = await Drink.create({
      name: drinkTemplate.name,
      volume,
      alcoholPercentage: drinkTemplate.alcoholPercentage,
      userId: userId
    });

    res.status(201).json({ message: 'Consommation enregistrée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const createDrink = async (req, res) => {
  try {
    const { name, price, size } = req.body;
    const newDrink = new Drink({ name, price, size });
    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: 'Boisson non trouvée' });
    res.status(200).json(drink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDrinksByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const drinks = await Drink.find({ userId });

    if (!drinks || drinks.length === 0) {
      return res.status(404).json({ message: 'Aucune boisson trouvée pour cet utilisateur' });
    }

    res.status(200).json(drinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateDrink = async (req, res) => {
  try {
    const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDrink) return res.status(404).json({ message: 'Boisson non trouvée' });
    res.status(200).json(updatedDrink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDrink = async (req, res) => {
  try {
    const deletedDrink = await Drink.findByIdAndDelete(req.params.id);
    if (!deletedDrink) return res.status(404).json({ message: 'Boisson non trouvée' });
    res.status(200).json({ message: 'Boisson supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDrink,
  getDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
  addDrink,
  getDrinksByUserId,
};