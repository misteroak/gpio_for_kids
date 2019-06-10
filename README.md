# gpio2019

## Introduction
### Some long, potentially not-so-interesting background
I was asked by my 4 y/o to teach her friends at school about computers. I thought it would be a good idea to show them some cool things they can do with a [Raspberry Pi](https://www.raspberrypi.org/). I built a sort of a LED piano, by which all the toddlers in class can build a "script" together - each one can choose one of several LEDs or a buzzer to buzz:

!!! ADD IMAGE HERE !!!

I knew a little bit of React (see XXX) and wanted to learn how to use Websockets. So decided to use this project as a vehicle to learn that.

I also wanted to solve is setting up a remote development environment for Raspberry Pi. I discuss below how I did that. I heard VS Code is going to have official support for that at some point, but didn't want to wait.

### How does it work

* __Frontend__: Expected to run on a laptop and is implemented with (React)[https://reactjs.org/] and [React Bootstrap](https://react-bootstrap.github.io/) as UI library.

* __Backend__: Expected to run directly on the Raspberry Pi. Implemented as a node.js app. I used (pigpio)[https://www.npmjs.com/package/pigpio] to acceaa RPI's GPIO. Found this to be the most convenient library out there.

* __Communication__: I used Websockets, and specifically (socket.io)[socket.io] to communicate between the client and the server. The laptop you're running the client on and the Raspberry PI should either be on the same Wifi network or [connected directly using an Ethernet cable](https://www.dexterindustries.com/BrickPi/brickpi-tutorials-documentation/getting-started/using-the-pi/connect-to-your-raspberry-pi-from-a-mac/).

## Getting Started

### Prerequisites
* A Raspberry Pi. I was using a [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/), but I guess any other version with a GPIO would work.
* [Breadboard](https://www.amazon.com/gp/product/B07DL13RZH/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1), GPIO breakout, LEDs, resistors, [jumper wires](https://www.amazon.com/gp/product/B07GD2BWPY/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1) and a [passive buzzer](https://www.amazon.com/gp/product/B016D5L5KE/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1). Follow the links for the ones I used.
* [Visual Studio Code](https://code.visualstudio.com/Download)

I'm not getting into the details of how to connect your breadboard to the PI's GPIO and how to setup the organ itself. Please follow the image above.

### On your Raspberry Pi
1. Set up your Raspberry Pi, SSH and node.js. Following [this guide](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp) if you're not sure how. 

### On your dev laptop
1. Clone this git repository. You will see the following top-level directories:
    
    __.vscode__: The important file here is *tasks.json*, which I used for setting up the remote development environment. See more below !!! ADD LINK !!!
    
    __server__: This is the code for the server.
    
    __webapp__: This is the code for the client.
    
1. Install packages for the client:

    ```
    cd webapp 
    npm i
    ```

1. Assuming you are developing on a laptop (i.e., not directly on a Raspberry Pi), you don't really need to install the packages for the server. However, uou do need to get the server code on the pi. I recommend doing that as part of the remote dev environment I cover below [ADD LINK]. But you can also copy the code there manually using SSH.

    In any event, the first time you get the server code on the PI, you'll need to install the pacakges:


    ```
    cd server-synced
    npm i
    ```

    Notice that I was using "server-synced" as the folder for the code synced from my dev laptop. Again, see more under "setting up a remote dev environment" [XXX link]



# Remote Development Environment
To get my remote development environment I mostly followed this [post](https://stackoverflow.com/questions/53320958/vscode-python-remote-interpreter/54789809#54789809) on Stack Exchange.

See my version under */.vscode/tasks.json*.

Note that I was using SSH using public key authenticate. Follow [this guide](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md) on how to setup.

My PI's hostname was "pi_eth".

