import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import Nothing from "./Nothing";
// import actionAddIngredient from '../actions/actionAddIngredient';
// import actionDeleteIngredient from '../actions/actionDeleteIngredient';
import "../styles/Main.css";

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: this.props.recipes
        };
    }

    render() {
        if (this.state.recipes.length > 0) {
            return (
                <Container className="recipesContainer">
                    <Row className="row">
                        <Col className="col justify-content-center">
                            <h3>Recipes</h3>
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
        recipes: state.recipes
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);