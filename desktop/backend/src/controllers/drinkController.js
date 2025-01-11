const Drink = require('../models/Drink');
const DrinkTemplate = require ('../models/DrinkTemplate');
const User = require ('../models/User');

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

const deleteDrinkByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const drinkId = req.params.drinkId;

    const drink = await Drink.findOne({ _id: drinkId, userId });

    if (!drink) {
      return res.status(404).json({ message: 'Boisson non trouvée ou non associée à cet utilisateur.' });
    }

    await Drink.deleteOne({ _id: drinkId });

    res.status(200).json({ message: 'Boisson supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
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

const calculateAlcoholRate = async (req, res) => {
  // try {
    const userId = req.params.userId; 

    console.log("userid : " + userId)

    const drinks = await Drink.find({ userId });

    //console.log("drinks :" + drinks)

    if (!drinks || drinks.length === 0) {
      return res.status(404).json({ message: 'Aucune boisson trouvée pour cet utilisateur' });
    }

    const user = await User.findById(userId);

    console.log("user:" + user)
    if (!user || !user.weight || !user.gender) {
      return res.status(400).json({ message: "Données utilisateur incomplètes (poids ou genre manquant)." });
    }

    const { weight, gender } = user;
    const coefficient = gender === 'male' ? 0.7 : 0.6;

    let alcoholVolumeMl = 0;


    const totalAlcoholGrams = drinks.reduce((total, drink) => {
      console.log("volume: " + drink.volume);
      console.log("percentage: " + drink.alcoholPercentage);
      alcoholVolumeMl = (drink.volume * drink.alcoholPercentage) / 100;
      const alcoholGrams = alcoholVolumeMl * 0.8;
      return total + alcoholGrams;
    }, 0);

    console.log("alcool volume : " + alcoholVolumeMl);

    
    console.log("total alcool : " + totalAlcoholGrams);

    const alcoholRate = totalAlcoholGrams / (weight * coefficient);

    res.status(200).json({
      message: "Taux d'alcoolémie calculé avec succès",
      alcoholRate: alcoholRate.toFixed(2),
    });
  // } catch (err) {
  //   res.status(500).json({ message: 'Erreur serveur', error: err.message });
  // }
};

module.exports = {
  createDrink,
  getDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
  addDrink,
  getDrinksByUserId,
  calculateAlcoholRate,
  deleteDrinkByUserId
};