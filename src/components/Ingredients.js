import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import Nothing from "./Nothing";
import actionAddIngredient from '../actions/actionAddIngredient';
import actionDeleteIngredient from '../actions/actionDeleteIngredient';
import "../styles/Main.css";

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            ingredients: this.props.ingredients
        };
    }

    render() {
        if (this.state.ingredients.length > 0) {
            return (
                <Container className="ingredientsContainer">
                    <Row className="justify-content-center">
                        <h3>Ingredients</h3>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Image/Video</h4>
                            <img src={this.state.source.link} id="sourceImage" alt="" />
                        </Col>
                        <Col>
                            <h4>Ingredients List</h4>
                            <Row>
                                <Col><h5>Ingredient</h5></Col>
                                <Col><h5>Probability</h5></Col>
                                <Col><h5>Option</h5></Col>
                            </Row>
                            {this.state.ingredients.map(ingredient => {
                                return <Row key={ingredient.id}>
                                    <Col className="my-auto">{ingredient.name}</Col>
                                    <Col className="my-auto">{ingredient.value}</Col>
                                    <Col className="my-auto">
                                        <button onClick={() => this.props.eventDeleteIngredient(ingredient)}
                                            className="deleteButton">
                                            DELETE
                                        </button>
                                    </Col>
                                </Row>
                            })}
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
        ingredients: state.ingredients
    };
}

function mapDispatchToProps(dispatch) {
    return {
        eventAddIngredient: (ingredient) => dispatch(actionAddIngredient(ingredient)),
        eventDeleteIngredient: (ingredient) => dispatch(actionDeleteIngredient(ingredient))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);