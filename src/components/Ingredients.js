import React from 'react';
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/Main.css";

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        };
    }

    render() {
        return (
            <Container className="ingredientsContainer">
                <Row className="ingredientsRow">

                </Row>
            </Container>
        );
    }
}

export default Ingredients;