const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var state = {
  conneciton: null
}

io.on('connection', (socket) => {
  if (null == state.conneciton) {
    state.socket = socket;
    console.log(`Made socket connection (${socket.id})`);
  }
  else {
    socket.disconnect();
    console.log(`Refused socket connection`);
  }

  socket.on('click', (data) => {
    console.log(data);
    io.sockets.emit('data', data);
  });
});

server.listen(3000);
console.log("Listening on port 3000...");