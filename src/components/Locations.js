import React from 'react';
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/Main.css";

class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }

    render() {
        return (
            <Container className="locationsContainer">
                <Row className="locationsRow">

                </Row>
            </Container>
        );
    }
}

export default Locations;