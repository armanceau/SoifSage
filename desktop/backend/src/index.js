// Importation des modules nécessaires
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT;

console.log("PORT : " + PORT)

// Middleware pour analyser le corps des requêtes
app.use(bodyParser.json());

// "Base de données" simulée pour les utilisateurs
const users = [];

// Fonction pour vérifier si un utilisateur est authentifié via JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Route d'inscription (enregistrement)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Ajout de l'utilisateur à la "base de données"
  users.push({ username, password: hashedPassword });

  console.log("username : " + username)
  console.log("password " + password)
  console.log("password hashé" + hashedPassword)

  res.status(201).send('User registered');
});

// Route de connexion (authentification)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("username : " + username)
  console.log("password " + password)
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Recherche de l'utilisateur dans la "base de données"
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).send('User not found');

  // Vérification du mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Invalid password');

  // Création du JWT
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
