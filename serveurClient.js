const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Définir le dossier pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'admin_front')));

app.get('/', (req, res) => {
    // Envoyer le fichier HTML
    res.sendFile(path.join(__dirname, 'admin_front', 'adminClient.html'));
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
