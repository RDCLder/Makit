import React from 'react';
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Main.css";

class Nothing extends React.Component {

    render() {
        return (
            <Container className="nothingContainer">
                <Row className="justify-content-center">
                    <h3>There's Nothing Here!</h3>
                </Row>
                <Row className="justify-content-center">
                    <Link to="/">
                        <h4>Click Here First</h4>
                    </Link>
                </Row>
            </Container>
        )
    }

}

export default Nothing;