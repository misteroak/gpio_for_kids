import React, { Component } from "react";
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import ActionSelector from './actions-selector.jsx';
import StepsCintainer from './steps-container.jsx';


class AppWrapper extends Component {

    constructor(props) {
        super();

        this.state = {
            selectedStep: -1,
            steps: props.initialSteps,
            playbackSpeed: 750,
        }

        this.onStepClick = this.onStepClick.bind(this);
        this.onActionButtonClick = this.onActionButtonClick.bind(this);
        this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
    }

    onActionButtonClick(e, buttonId) {
        var new_steps = this.state.steps;
        new_steps[this.state.selectedStep]["action"] = buttonId;

        this.setState({
            steps: new_steps,
        });
    }

    onPlayButtonClick() {
        this.props.handlePlayClicked(this.state);
        var that = this;
        
        var i = 0;
        (function f() {
            console.log("Selecting card ", i);
            
            that.setState({
                selectedStep: i
            });

            i++;
            if (i < that.state.steps.length) {
                setTimeout(f, that.state.playbackSpeed + 50);
            } else {
                setTimeout(() => {
                    that.setState({
                        selectedStep: -1
                    });
                }, that.state.playbackSpeed + 50);
            }
        })();
    }

    onStepClick(e, id) {

        this.setState({
            selectedStep: id,
        })
    }

    onAddButtonClick() {
        var new_steps = this.state.steps;
        new_steps.push({ "action": "R" })

        this.setState({
            steps: new_steps,
        });
    }

    render() {

        return (
            <React.Fragment>
                <Container>
                    <Navbar bg="light" expand="lg" fixed="top" className="justify-content-center">
                        <ActionSelector
                            onAcitonClick={this.onActionButtonClick}
                            onPlayClick={this.onPlayButtonClick} />
                    </Navbar>
                </Container>

                <Container id="main">
                    <Row>
                        <Col className="d-flex flex-wrap">
                            <StepsCintainer
                                steps={this.state.steps}
                                selectedStep={this.state.selectedStep}
                                onStepClick={this.onStepClick}
                                onAddClick={this.onAddButtonClick}
                            />
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

AppWrapper.propTypes = {
    initialSteps: PropTypes.array,
    handlePlayClicked: PropTypes.func.isRequired,
}

export default AppWrapper;
