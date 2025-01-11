const express = require('express');
const router = express.Router();
const { getDrinkTemplates } = require('../controllers/drinkTemplateController')

router.get('/', getDrinkTemplates);

module.exports = router;