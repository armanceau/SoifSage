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
  getDrinksByUserId,
  calculateAlcoholRate,
  deleteDrinkByUserId
} = require('../controllers/drinkController');

router.post('/', authenticateToken, createDrink);
router.post('/add', authenticateToken, addDrink);
router.get('/', authenticateToken, getDrinks);
router.get('/:id', authenticateToken, getDrinkById);
router.get('/user/:id', authenticateToken, getDrinksByUserId);
router.get('/user/:userId/alcohol-rate', authenticateToken, calculateAlcoholRate);
router.put('/:id', authenticateToken, updateDrink);
router.delete('/:id', authenticateToken, deleteDrink);
router.delete('/user/:userId/:id', authenticateToken, deleteDrinkByUserId);


module.exports = router;