const express = require('express');
const router = express.Router();
const {
  createDrink,
  getDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
} = require('../controllers/drinkController');

router.post('/', createDrink);
router.get('/', getDrinks);
router.get('/:id', getDrinkById);
router.put('/:id', updateDrink);
router.delete('/:id', deleteDrink);

module.exports = router;