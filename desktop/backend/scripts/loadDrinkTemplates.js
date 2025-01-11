const mongoose = require('mongoose');

const drinks = [
  { name: 'Bière blonde', alcoholPercentage: 5, defaultVolume: 250 },
  { name: 'Bière brune', alcoholPercentage: 7, defaultVolume: 330 },
  { name: 'Vin rouge', alcoholPercentage: 12, defaultVolume: 150 },
  { name: 'Vin blanc', alcoholPercentage: 11, defaultVolume: 150 },
  { name: 'Vodka', alcoholPercentage: 40, defaultVolume: 40 },
  { name: 'Whisky', alcoholPercentage: 40, defaultVolume: 40 },
  { name: 'Tequila', alcoholPercentage: 38, defaultVolume: 40 },
  { name: 'Cocktail Margarita', alcoholPercentage: 20, defaultVolume: 120 }
];

const loadDrinkTemplates = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/soifsage');

    for (const drink of drinks) {
      const exists = await DrinkTemplate.findOne({ name: drink.name });
      if (!exists) {
        await DrinkTemplate.create(drink);
        console.log(`Boisson ajoutée : ${drink.name}`);
      }
    }

    console.log('Boissons pré-enregistrées chargées avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur lors du chargement des boissons :', err);
    process.exit(1);
  }
};

loadDrinkTemplates();