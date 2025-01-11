const mongoose = require('mongoose');

const drinkTemplateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    alcoholPercentage: { 
        type: Number, 
        required: true 
    },
    defaultVolume: { 
        type: Number, 
        required: true 
    }
});

const DrinkTemplate = mongoose.model('DrinkTemplate', drinkTemplateSchema);
module.exports = DrinkTemplate;