import React, { Component } from "react";
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import StepCard from "./step-card.jsx"

class StepsContainer extends Component {
    constructor(props) {
        super();
    }

    render() {

        return (
            <React.Fragment>
            {this.props.steps.map((step, index) => (

                <StepCard
                    key = { index }
                    id = { index }
                    onStepClick = { (e, id) => this.props.onStepClick(e, index) }
                    selected = { this.props.selectedStep == index }
                    action = {step["action"] }
                    image = {step["image"]}
                />
    
            ))}

            </React.Fragment>
        );
    }

}

StepsContainer.propTypes = {
    steps: PropTypes.array.isRequired,
    selectedStep: PropTypes.number.isRequired,
    onStepClick: PropTypes.func.isRequired
}

export default StepsContainer;