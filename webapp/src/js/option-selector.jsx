import React, { Component } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMusic } from '@fortawesome/free-solid-svg-icons'

class OptionSelector extends Component {

    render() {
        return (
            <Card className="my-3 text-center">
                <Card.Body>
                    <Button className="mx-3 px-3" size="lg" variant="danger" onClick={(e, id) => this.props.onOptionClick(e, 1)}><FontAwesomeIcon icon={faLightbulb} /> <span>Red</span></Button>
                    <Button className="mx-3 px-3" size="lg" variant="primary" onClick={(e, id) => this.props.onOptionClick(e, 2)}><FontAwesomeIcon icon={faLightbulb} /> <span>Blue</span></Button>
                    <Button className="mx-3 px-3" size="lg" variant="success" onClick={(e, id) => this.props.onOptionClick(e, 3)}><FontAwesomeIcon icon={faLightbulb} /> <span>Green</span></Button>
                    <Button className="mx-3 px-3" size="lg" variant="warning" onClick={(e, id) => this.props.onOptionClick(e, 4)}><FontAwesomeIcon icon={faLightbulb} /> <span>Yellow</span></Button>
                    <Button className="mx-3 px-3" size="lg" variant="secondary" onClick={(e, id) => this.props.onOptionClick(e, 5)}><FontAwesomeIcon icon={faLightbulb} /> <span>White</span></Button>
                    <Button className="mx-3 px-3" size="lg" variant="dark" onClick={(e, id) => this.props.onOptionClick(e, 6)}><FontAwesomeIcon icon={faMusic} /> <span>Beep</span></Button>

                </Card.Body>
            </Card>
        );
    }

}

OptionSelector.propTypes = {
}

export default OptionSelector;