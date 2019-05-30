const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    
  console.log(`Made socket connection (${socket.id})`);
  
  socket.on('click', (data) => {
    console.log(data);
    io.sockets.emit('data', data+data);
  });
});

server.listen(3000);
console.log("Listening on port 3000...");
