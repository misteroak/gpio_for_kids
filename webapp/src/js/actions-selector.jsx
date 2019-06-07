import React, { Component } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMusic, faPlay } from '@fortawesome/free-solid-svg-icons'

class ActionSelector extends Component {

    render() {
        return (
            <Card className="my-3 text-center">
                {/* <Card.Body> */}
                <ListGroup>
                    <ListGroupItem>
                        <Button className="mx-3 px-3" size="lg" variant="danger" onClick={(e, id) => this.props.onAcitonClick(e, "R")}><FontAwesomeIcon icon={faLightbulb} /> <span>Red</span></Button>
                        <Button className="mx-3 px-3" size="lg" variant="primary" onClick={(e, id) => this.props.onAcitonClick(e, "G")}><FontAwesomeIcon icon={faLightbulb} /> <span>Blue</span></Button>
                        <Button className="mx-3 px-3" size="lg" variant="success" onClick={(e, id) => this.props.onAcitonClick(e, "B")}><FontAwesomeIcon icon={faLightbulb} /> <span>Green</span></Button>
                        <Button className="mx-3 px-3" size="lg" variant="warning" onClick={(e, id) => this.props.onAcitonClick(e, "Y")}><FontAwesomeIcon icon={faLightbulb} /> <span>Yellow</span></Button>
                        <Button className="mx-3 px-3" size="lg" variant="secondary" onClick={(e, id) => this.props.onAcitonClick(e, "W")}><FontAwesomeIcon icon={faLightbulb} /> <span>White</span></Button>
                        <Button className="mx-3 px-3" size="lg" variant="dark" onClick={(e, id) => this.props.onAcitonClick(e, "Z")}><FontAwesomeIcon icon={faMusic} /> <span>Beep</span></Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button className="mx-3 px-3" variant="info" onClick={this.props.onPlayClick}><FontAwesomeIcon icon={faPlay} /> <span>Play</span></Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }

}

ActionSelector.propTypes = {
    onAcitonClick: PropTypes.func.isRequired,
    onPlayClick: PropTypes.func.isRequired
}

export default ActionSelector;