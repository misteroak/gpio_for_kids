import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import socketIOClient from 'socket.io-client';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import OptionSelector from './option-selector.jsx';
import StepCard from './step-card.jsx';

class App extends Component {

    constructor() {
        super();

        this.state = {
            socket: null,
            endpoint: "http://pi:3000",
            steps: [
                {"id" : 0, "step": 1},
                {"id" : 1, "step": 1},
                {"id" : 2, "step": 1},
                {"id" : 3, "step": 1},
                {"id" : 4, "step": 1},
                {"id" : 5, "step": 1},
            ],
            selectedStep: -1,
        }

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSelectorButtonClick = this.onSelectorButtonClick.bind(this);
        this.onStepClick = this.onStepClick.bind(this);
    }

    componentWillMount() {
        // console.log("Going to connect...");
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);

        // socket.on('connect', () => {
        //     console.log("Connected: " + socket.id);
        //     this.setState({
        //         socket: socket,
        //     });
        // });

        // socket.on('data', (data) => {

        //     this.setState({
        //         clickedButton: data
        //     })
        // });

        // socket.on('disconnect', (data) => {

        //     console.log("Socket disconnected");
        //     this.setState({
        //         socket: null
        //     })
        // });

    }

    onButtonClick(e, buttonId) {
        this.state.socket.emit('click', buttonId);
    }

    onSelectorButtonClick(e, buttonId) {
        var new_steps = this.state.steps;
        new_steps[this.state.selectedStep]["step"]=buttonId;
        
        this.setState({
            steps: new_steps,
        });
    }

    onStepClick(e, id) {
        
        this.setState({
           selectedStep: id, 
        })
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <OptionSelector onOptionClick={this.onSelectorButtonClick}/>
                        </Col>

                    </Row>
                    <Row>
                        <Col className="d-flex flex-wrap">
                            {
                            [0,1,2,3,4,5].map((id) => 
                                <StepCard 
                                    key={id} 
                                    id={id} 
                                    onStepClick={this.onStepClick} 
                                    selected={this.state.selectedStep == id}
                                    selection = {this.state.steps[id]["step"]}
                                    image = "11-ariel"
                                    />
                            )
                            }
                        </Col>
                    </Row>

                </Container>
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
            </React.Fragment>
        );
    }
}

export default App;