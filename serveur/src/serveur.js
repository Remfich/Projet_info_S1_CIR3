
const express = require('express');
const app = express();

// Autoriser les requêtes cross-origin 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Gérez la route '/api/data' pour la réception de la requête POST
app.post('/api/data', (req, res) => {
    // Traitez la requête et renvoyez la réponse appropriée
    const tabArticles = req.body.tabArticles; // Assurez-vous que le nom correspond à la clé dans votre objet JSON
    console.log('Données reçues sur le serveur :', tabArticles);
    res.json({ message: 'Données reçues avec succès' });
  });
  

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
