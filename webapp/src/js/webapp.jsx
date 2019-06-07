import React, { Component } from "react";
import socketIOClient from 'socket.io-client';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import AppWrapper from "./app-wrapper.jsx";

class App extends Component {

    constructor() {
        super();

        this.state = {
            socket: null,
            // endpoint: "http://pi:3000",
            endpoint: "http://localhost:3000",
        }

        this.handlePlayClicked = this.handlePlayClicked.bind(this);
    }

    componentWillMount() {
        console.log("Going to connect...");
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        socket.on('connect', () => {
            console.log("Connected: " + socket.id);
            this.setState({
                socket: socket,
            });
        });

        socket.on('data', (data) => {

            this.setState({
                clickedButton: data
            })
        });

        socket.on('disconnect', (data) => {

            console.log("Socket disconnected");
            this.setState({
                socket: null
            })
        });

    }

    handlePlayClicked(steps) {
        console.log("Sending to server:",steps);
        this.state.socket.emit("play", steps);
    };

    render() {

        // const initialSteps = [
        //     { "action": 1, "image": "1-alma" },
        //     { "action": 1, "image": "10-elle" },
        //     { "action": 1, "image": "11-ariel" },
        //     { "action": 1, "image": "12-gabriella" },
        //     { "action": 1, "image": "13-sammi" },
        //     { "action": 1, "image": "14-clarity" },
        //     { "action": 1, "image": "15-anna" },
        //     { "action": 1, "image": "16-esta" },
        //     { "action": 1, "image": "2-ava" },
        //     { "action": 1, "image": "3-naomi" },
        //     { "action": 1, "image": "4-mia" },
        //     { "action": 1, "image": "5-raz" },
        //     { "action": 1, "image": "6-maya" },
        //     { "action": 1, "image": "7-bassi" },
        //     { "action": 1, "image": "8-eliana" },
        //     { "action": 1, "image": "9-kiran" }
        // ];

        const initialSteps = [
            { "action": 1},
            { "action": 1},
            { "action": 1},
            { "action": 1},
            { "action": 1},
        ];


        return (
            <React.Fragment>
                <AppWrapper 
                    initialSteps={initialSteps}
                    handlePlayClicked={this.handlePlayClicked} 
                />
                <footer className="footer mt-auto py-1 px-4 border-top bg-light text-right" >
                    {this.state.socket == null ? (
                        <div>
                            <FontAwesomeIcon icon={faTimesCircle} color="LightCoral" />
                            <span> Disconnected</span>
                        </div>

                    ) : (
                            <div>
                                <FontAwesomeIcon icon={faCheckCircle} color="SeaGreen" />
                                <span> Connected</span>
                            </div>
                        )}
                </footer>
            </React.Fragment >
        );
    }
}

export default App;