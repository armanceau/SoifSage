require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const drinkRoutes = require('./routes/drink');

const app = express();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET manquant dans les variables d\'environnement');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Book Service - Incoming Request:", {
    method: req.method,
    url: req.url,
    path: req.path,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  });
  next();
});

app.use(['/api/drinks'], drinkRoutes);
//app.use(['/api/auth/register'], authRoutes);
app.use(['/api/auth'], authRoutes);

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "book",
    timestamp: new Date().toISOString(),
  });
});

// Route pour attraper toutes les requêtes non gérées
app.use((req, res) => {
  console.log("Route non trouvée:", {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
  res.status(404).json({
    error: "Route non trouvée",
    path: req.url,
    method: req.method,
  });
});

console.log("connexion à mongodb")
// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://mongo:27017/soifsage", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à MongoDB");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Service Book démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors du démarrage:", err);
    process.exit(1);
  });
