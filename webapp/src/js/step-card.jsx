import React, { Component } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMusic } from '@fortawesome/free-solid-svg-icons'


class StepCard extends Component {

    render() {

        var selectionIcon = null;

        switch (this.props.selection) {
            case 1:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="danger"> <FontAwesomeIcon icon={faLightbulb} /> <span>Red</span></Button>
                break;
            case 2:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="primary"> <FontAwesomeIcon icon={faLightbulb} /> <span>Blue</span></Button>
                break;
            case 3:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="success"> <FontAwesomeIcon icon={faLightbulb} /> <span>Green</span></Button>
                break;
            case 4:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="warning"> <FontAwesomeIcon icon={faLightbulb} /> <span>Yellow</span></Button>
                break;
            case 5:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="secondary"> <FontAwesomeIcon icon={faLightbulb} /> <span>White</span></Button>
                break;
            case 6:
                selectionIcon = <Button className="mx-3 px-3" size="lg" variant="dark"> <FontAwesomeIcon icon={faMusic} /> <span>Beep</span></Button>
                break;
        }

        var imageTop = null;
        var header = null;
        
        if (this.props.image) {
            imageTop = <Card.Img variant="top" src={`src/img/${this.props.image}.png`} />
        } else {
            
        }
        header = <h1 className="card-header">{this.props.id + 1}</h1>;


        return (
            <div className="w-25 p-2">
                <Card
                    className="text-center border-3"
                    onClick={(e, id) => this.props.onStepClick(e, this.props.id)}
                    border={this.props.selected ? "dark" : ""}
                >
                    {header}
                    {imageTop}
                    
                    <Card.Body>
                        {selectionIcon}
                    </Card.Body>
                </Card>
            </div>
        );
    }


}

StepCard.propTypes = {
    id: PropTypes.number.isRequired,
}

export default StepCard;
