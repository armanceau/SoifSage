const express = require('express');
const { register, login } = require('../controllers/authController'); // Utilise require

const router = express.Router();

// Routes d'authentification
router.post('/register', register);
router.post('/login', login);

module.exports = router; // Utilise module.exports au lieu de export default