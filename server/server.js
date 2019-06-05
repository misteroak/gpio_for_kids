const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(26, 'out'); //use GPIO pin 4, and specify that it is output
//var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

// function blinkLED() { //function to start blinking
//   if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//     LED.writeSync(1); //set pin state to 1 (turn LED on)
//   } else {
//     LED.writeSync(0); //set pin state to 0 (turn LED off)
//   }
// }

// function endBlink() { //function to stop blinking
//   clearInterval(blinkInterval); // Stop blink intervals
//   LED.writeSync(0); // Turn LED off
//   LED.unexport(); // Unexport GPIO to free resources
// }

// setTimeout(endBlink, 5000); //stop blinking after 5 seconds

io.on('connection', (socket) => {

  console.log(`Made socket connection (${socket.id})`);

  socket.on('click', (data) => {
    console.log(data);
    if (1 == data) {
      console.log("Turning LED on");
      LED.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
      console.log("Turning LED off");
      LED.writeSync(0); //set pin state to 1 (turn LED on)
    }

    io.sockets.emit('data', data);
  });
});

server.listen(3000);
console.log("Listening on port 3000...");
