const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();

const server = app.listen(3000, () => {
  console.log("Listening on port 3000...");
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log(`Made socket connection (${socket.id})`);

  socket.on('chat', (data) => {
    console.log(data);
    io.sockets.emit('chat', data);
  });
});