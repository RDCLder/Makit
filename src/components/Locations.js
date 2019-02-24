import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import Nothing from "./Nothing";
import actionAddIngredient from '../actions/actionAddIngredient';
import actionDeleteIngredient from '../actions/actionDeleteIngredient';
import "../styles/Main.css";

class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addIngredient: {
                name: "",
                value: ""
            }
        };
    }

    changeIngredientName(ingredient) {
        this.setState({
            ...this.state,
            addIngredient: {
                name: ingredient.target.value,
                value: "Added"
            }
        });
    }

    handleSubmitIngredient(ingredientName) {
        if (ingredientName !== "") {
            this.props.eventAddIngredient(this.state.addIngredient);
        } else {
            alert("The ingredient name can't be empty!");
        }
    }

    render() {

        // Conditionally renders image/video if source is available
        let media;
        if (this.props.source.link === "") {
            media = <Link to="/"><button className="ingredientsButton">
                <h4>Add Image/Video</h4>
            </button></Link>
        } else {
            media = <img src={this.props.source.link} id="sourceImage" alt="" />
        }

        // if (this.state.locations.length > 0) {
        return (
            <Container className="locationsContainer">
                <Row className="justify-content-center">
                    <h3>Locations</h3>
                </Row>
                <Row>
                    <Col>
                        <Row className="justify-content-center mb-1"><h4>Image/Video</h4></Row>
                        {media}
                    </Col>
                    <Col>
                        <Row>
                            <Col><h4>Ingredient</h4></Col>
                            <Col><h4>Probability</h4></Col>
                            <Col><h4>Options</h4></Col>
                        </Row>
                        <Row>
                            <Col className="my-auto">
                                <input type="text"
                                    placeholder="Name"
                                    id="addIngredientInput"
                                    onChange={(e) => this.changeIngredientName(e)} />
                            </Col>
                            <Col className="my-auto">Added</Col>
                            <Col className="my-auto">
                                <button onClick={() => this.handleSubmitIngredient(this.state.addIngredient.name)}
                                    className="ingredientsOption">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </Col>
                        </Row>
                        {this.props.ingredients.map(ingredient => {
                            // let searchURL = `https://www.google.com/maps/search/${ingredient.name}/`;
                            return <Row key={ingredient.name}>
                                <Col className="my-auto">{ingredient.name}</Col>
                                <Col className="my-auto">{ingredient.value}</Col>
                                <Col className="my-auto">
                                    <a href={`https://www.google.com/maps/search/${ingredient.name}/`} target="_blank" rel="noopener noreferrer">
                                    <button className="ingredientsOption">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </button>
                                    </a>
                                    <button onClick={() => this.props.eventDeleteIngredient(ingredient)}
                                    className="ingredientsDelete">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </Col>
                            </Row>
                        })}
                    </Col>
                </Row>
            </Container >
        );
        // } else {
        // return (
        //     <Nothing />
        // );
        // }
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
        eventDeleteIngredient: (ingredient) => dispatch(actionDeleteIngredient(ingredient)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);