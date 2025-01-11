const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    getUsers
} = require('../controllers/userController');

router.get('/', authenticateToken, getUsers);

module.exports = router;