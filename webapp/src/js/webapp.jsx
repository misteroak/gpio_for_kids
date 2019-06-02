import React, { Component} from "react";

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';

// import SVGServerConnectionOff from '../img/connection-off.svg';
import SVGConnectionOff from '-!svg-react-loader!../img/connection-off.svg';
import SVGConnectionOn from '-!svg-react-loader!../img/connection-on.svg';

import socketIOClient from 'socket.io-client';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            socket: null,
            endpoint: "http://pi:3000",
            clickedButton: "Click a button"
        }

        this.onButtonClick = this.onButtonClick.bind(this);
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

    onButtonClick(e, buttonId) {
        this.state.socket.emit('click', buttonId);
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <CardDeck>
                            <Card>
                                <Card.Header>Red LED</Card.Header>
                                <Card.Body>
                                    <Button className="m-3"
                                        variant="primary"
                                        onClick={(e) => this.onButtonClick(e, 1)}
                                    >
                                        LED ON
                                </Button>
                                    <Button className="m-3"
                                        variant="primary"
                                        onClick={(e) => this.onButtonClick(e, 2)}
                                    >
                                        LED OFF
                                </Button>

                                    <div className="text-center">
                                        {this.state.clickedButton}
                                    </div>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Row>

                </Container>
                <footer className="footer mt-auto py-1 px-4 border-top bg-light text-right" >
                    {this.state.socket == null ? (
                        <div>
                            <SVGConnectionOff height="2vh" className="px-2"/>
                            <span>Disconnected</span>
                        </div>
                        
                    ) : (
                        <div>
                            <SVGConnectionOn height="2vh" className="px-2"/>
                            <span>Connected</span>
                        </div>
                    )}
                </footer>
            </React.Fragment>
        );
    }
}

export default App;