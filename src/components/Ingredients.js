import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import actionAddIngredient from '../actions/actionAddIngredient';
import actionDeleteIngredient from '../actions/actionDeleteIngredient';
import actionRecipeResults from '../actions/actionRecipeResults';
import "../styles/Main.css";

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addIngredient: {
                name: "",
                value: ""
            }
        };
    }

    addIngredient(ingredient) {
        this.setState({
            ...this.state,
            addIngredient: {
                name: ingredient.target.value,
                value: "Added"
            }
        })
    }

    handleSubmitRecipe(ingredient) {

        // Edamam API
        const url = "https://api.edamam.com/search?q=";
        const appID = "9fd06046";
        const appKey = "74c9048050e33fbbe8fea9373d038cf4";
        fetch(url + ingredient.name + "&app_id=" + appID + "&app_key=" + appKey + "&from=0&to=15")
            .then(res => res.json())
            .then(recipes => {
                let justRecipes = recipes.hits.map(recipe => {
                    return recipe.recipe;
                });
                console.log(justRecipes);
                this.props.eventRecipeResults(ingredient, justRecipes);
            })
            .then(() => {
                this.props.history.push("/recipes");
            })
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

        return (
            <Container className="ingredientsContainer">
                <Row className="justify-content-center">
                    <h3>Ingredients</h3>
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
                                    onChange={(e) => this.addIngredient(e)} />
                            </Col>
                            <Col className="my-auto">Added</Col>
                            <Col className="my-auto">
                                <button onClick={() => this.props.eventAddIngredient(this.state.addIngredient)}
                                    className="ingredientsOption">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </Col>
                        </Row>
                        {this.props.ingredients.map(ingredient => {
                            return <Row key={ingredient.name}>
                                <Col className="my-auto">{ingredient.name}</Col>
                                <Col className="my-auto">{ingredient.value}</Col>
                                <Col className="my-auto">
                                    <button onClick={() => this.handleSubmitRecipe(ingredient)}
                                        className="ingredientsOption">
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <button onClick={() => this.props.eventDeleteIngredient(ingredient)}
                                        className="ingredientsDelete">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </Col>
                            </Row>
                        })}
                    </Col>
                </Row>
            </Container>
        );
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
        eventRecipeResults: (ingredient, recipes) => dispatch(actionRecipeResults(ingredient, recipes))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);