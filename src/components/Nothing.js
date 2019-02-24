import React from 'react';
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Main.css";

class Nothing extends React.Component {

    render() {
        return (
            <Container className="nothingContainer">
                <h3>There's Nothing Here!</h3>
                <Row></Row>
                <Row className="justify-content-center">
                    <Link to="/"><button className="nothingButton">
                        <h4>Add Image/Video</h4>
                    </button></Link>
                </Row>
                <Row className="justify-content-center">
                    <Link to="/ingredients"><button className="nothingButton">
                        <h4>Add Ingredient</h4>
                    </button></Link>
                </Row>
            </Container >
        )
    }
}

export default Nothing;