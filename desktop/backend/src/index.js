require('dotenv').config(); // Charge les variables d'environnement
const express = require('express'); // Utilise require au lieu d'import
const mongoose = require('mongoose'); // Utilise require au lieu d'import
const authRoutes = require('./routes/auth'); // Utilise require au lieu d'import

const app = express();

// Middleware pour parser les JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Connexion MongoDB (optionnelle, si tu utilises MongoDB)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});