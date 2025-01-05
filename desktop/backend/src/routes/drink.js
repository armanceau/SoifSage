const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  createDrink,
  getDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
} = require('../controllers/drinkController');

router.post('/', authenticateToken, createDrink);
router.get('/', authenticateToken, getDrinks);
router.get('/:id', authenticateToken, getDrinkById);
router.put('/:id', authenticateToken, updateDrink);
router.delete('/:id', authenticateToken, deleteDrink);

module.exports = router;