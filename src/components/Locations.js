import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import Nothing from "./Nothing";
import "../styles/Main.css";

class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            ingredients: this.props.ingredients,
            recipes: this.props.recipes,
            locations: this.props.locations
        };
    }

    render() {
        if (this.state.locations.length > 0) {
            return (
                <Container className="locationsContainer">
                    <Row className="row">
                        <Col className="col justify-content-center">
                            <h3>Locations</h3>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Nothing />
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        source: state.source,
        ingredients: state.ingredients,
        recipes: state.recipes,
        locations: state.locations
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);