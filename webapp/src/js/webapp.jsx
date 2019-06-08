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

        socket.on('error', (error) => {
            console.error(error);
        })

    }

    handlePlayClicked(steps) {
        console.log("Sending to server:",steps);
        this.state.socket.emit("play", steps);
    };

    render() {

        const iinitialSteps = [
            { "action": "R", "image": "1-alma" },
            { "action": "R", "image": "10-elle" },
            { "action": "R", "image": "11-ariel" },
            { "action": "R", "image": "12-gabriella" },
            { "action": "R", "image": "13-sammi" },
            { "action": "R", "image": "14-clarity" },
            { "action": "R", "image": "15-anna" },
            { "action": "R", "image": "16-esta" },
            { "action": "R", "image": "2-ava" },
            { "action": "R", "image": "3-naomi" },
            { "action": "R", "image": "4-mia" },
            { "action": "R", "image": "5-raz" },
            { "action": "R", "image": "6-maya" },
            { "action": "R", "image": "7-bassi" },
            { "action": "R", "image": "8-eliana" },
            { "action": "R", "image": "9-kiran" }
        ];

        const initialSteps = [
            { "action": "R"},
            { "action": "G"},
            { "action": "B"},
            { "action": "Y"},
            { "action": "W"},
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
                                <span> Connected to {this.state.socket.id}</span>
                            </div>
                        )}
                </footer>
            </React.Fragment >
        );
    }
}

export default App;