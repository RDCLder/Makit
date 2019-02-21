import React from 'react';
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/Main.css";

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    render() {
        return (
            <Container className="recipesContainer">
                <Row className="recipesRow">

                </Row>
            </Container>
        );
    }
}

export default Recipes;