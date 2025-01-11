require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const drinkRoutes = require('./routes/drink');
const drinkTemplateRoute = require('./routes/drinkTemplate')

const app = express();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET manquant dans les variables d\'environnement');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("Book Service - Incoming Request:", {
//     method: req.method,
//     url: req.url,
//     path: req.path,
//     headers: req.headers,
//     timestamp: new Date().toISOString(),
//   });
//   next();
// });

app.use(['/api/drinks'], drinkRoutes);
app.use(['/api/auth'], authRoutes);
app.use(['/api/template'], drinkTemplateRoute);

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "drink",
    timestamp: new Date().toISOString(),
  });
});

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

const listRoutes = (app) => {
  console.log('Routes actives :');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes directes
      console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Sous-routes dans des routeurs
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${handler.route.path}`);
        }
      });
    }
  });
};

// Appelle cette fonction après avoir configuré tes routes
listRoutes(app);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://mongo:27017/soifsage", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à MongoDB");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Service démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors du démarrage:", err);
    process.exit(1);
  });
