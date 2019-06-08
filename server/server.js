const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const process = require('process');
const Gpio = require('pigpio').Gpio;

const R = new Gpio(25, { mode: Gpio.OUTPUT });
const G = new Gpio(12, { mode: Gpio.OUTPUT });
const B = new Gpio(16, { mode: Gpio.OUTPUT });
const Y = new Gpio(20, { mode: Gpio.OUTPUT });
const W = new Gpio(21, { mode: Gpio.OUTPUT });
const BUZZER = new Gpio(18, { mode: Gpio.OUTPUT });

io.on('connection', (socket) => {

  console.log(`Made socket connection (${socket.id})`);

  socket.on('play', (script) => {
    play(script.steps, script.playbackSpeed);
  });
});

server.listen(3000);
console.log("Listening on port 3000...");

const state = {
  "R": 0,
  "G": 0,
  "B": 0,
  "Y": 0,
  "W": 0,
  "BUZZER": 0
}

function applyState() {

  console.log("Applying:", state);

  R.digitalWrite(state["R"]);
  G.digitalWrite(state["G"]);
  B.digitalWrite(state["B"]);
  Y.digitalWrite(state["Y"]);
  W.digitalWrite(state["W"]);
  BUZZER.hardwarePwmWrite(state["BUZZER"], 500000);
}

function offAllLeds() {
  console.log("Truning off all leds");
  state["R"] = 0;
  state["G"] = 0;
  state["B"] = 0;
  state["Y"] = 0;
  state["W"] = 0;
  applyState();
}

function toggleLed(led) {
  console.log("Toggling LED: ", led);
  state[led] = 1 - state[led];
  applyState();
}

function singleLed(led) {
  offAllLeds();
  console.log("Turning on single LED: ", led);
  state[led] = 1;
  applyState();
}

function play(steps, playbackSpeed) {

  var i = 0;
  console.log("Playing:", steps);
  console.log("");

  (function f() {
    console.log("Performing step ", i, ": ", steps[i]);
    
    singleLed(steps[i]["action"]);
    i++;
    if (i < steps.length) {
      setTimeout(() => {
        offAllLeds();
        setTimeout(f, 50);
        }, playbackSpeed);
    } else {
      setTimeout(offAllLeds, playbackSpeed);
    }
  })();

}