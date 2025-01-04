const bcrypt = require('bcrypt'); // Utilise require
const jwt = require('jsonwebtoken'); // Utilise require

// Exemple d'une base de données simulée
const users = [];

// Fonction d'inscription
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonction de connexion
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { register, login }; // Utilise module.exports