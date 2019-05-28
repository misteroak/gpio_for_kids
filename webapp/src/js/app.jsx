import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

import socketIOClient from 'socket.io-client';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import css from '../css/style.css'

class App extends Component {

    constructor() {
        super();

        this.state = {
            socket: null,
            response: false,
            endpoint: "http://localhost:3000",
            clickedButton: "Click a button"
        }

        this.onButtonClick = this.onButtonClick.bind(this);
    } 

    componentWillMount() {
        console.log("Going to connect...");
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        this.state.socket = socket;
        socket.on('data', (data) => {
                        
            this.setState({
                clickedButton: data
            })
        });
        console.log(socket);
    }

    onButtonClick(e, buttonId) {
        this.state.socket.emit('click', buttonId);
    }

    render() {
        return (
            <Container className="app-container">
                <Button 
                    variant="primary" 
                    onClick={(e) => this.onButtonClick(e, 1)}
                >
                    Button 1
                </Button>
                <Button 
                    variant="primary" 
                    onClick={(e) => this.onButtonClick(e, 2)}
                >
                    Button 2
                </Button>

                <div>
                    {this.state.clickedButton}
                </div>
            </Container>
        );
    }
}

export default App;