import React from 'react';
import { Container } from "react-bootstrap";
import Navigator from "./Navigator";
import "../styles/Main.css";

class Base extends React.Component {

    render() {
        return (
            <Container fluid="true" id="baseContainer">
                <Navigator />
                {this.props.children}
            </Container >
        );
    }
}

export default Base;