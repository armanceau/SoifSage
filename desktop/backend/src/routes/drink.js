const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  createDrink,
  addDrink,
  getDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
} = require('../controllers/drinkController');

router.post('/', authenticateToken, createDrink);
router.post('/add', authenticateToken, addDrink);
router.get('/', authenticateToken, getDrinks);
router.get('/:id', authenticateToken, getDrinkById);
router.put('/:id', authenticateToken, updateDrink);
router.delete('/:id', authenticateToken, deleteDrink);

module.exports = router;