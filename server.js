const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000');
});
