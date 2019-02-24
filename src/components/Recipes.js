import React from 'react';
import { Container, Row, CardColumns, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import Nothing from "./Nothing";
import "../styles/Main.css";

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.recipes.ingredient,
            recipes: this.props.recipes.recipes
        };
    }

    addDefaultSrc(e) {
        e.target.src = "../../public/noImage.jpg";
    }

    render() {
        if (this.state.recipes.length > 0) {
            let ingredientName = this.state.ingredient.name;
            ingredientName = ingredientName[0].toUpperCase() + ingredientName.slice(1);
            return (
                <Container className="recipesContainer">
                    <Row className="justify-content-center">
                        <h3>{ingredientName} Recipes</h3>
                    </Row>
                    <Row>
                        <CardColumns>
                            {this.state.recipes.map(recipe => {
                                return <a href={recipe.shareAs} target="_blank" rel="noopener noreferrer" key={recipe.label}>
                                    <Card className="text-white bg-dark">
                                        <Card.Img src={recipe.image} alt="" onError={this.addDefaultSrc} className="cardImage" />
                                        <Card.ImgOverlay className="imgOverlay">
                                            <Card.Title className="cardText">{recipe.label}</Card.Title>
                                            <Row className="cardIngredients">
                                                {recipe.ingredientLines.map(ingredient => {
                                                    return <div key={ingredient}><p className="cardText">{ingredient}</p></div>
                                                })}
                                            </Row>
                                            <Row className="cardFooter justify-content-around">
                                                <p className="cardText">Calories: {Math.floor(recipe.calories / recipe.yield)} </p>
                                                <p className="cardText">Servings: {Math.floor(recipe.yield)}</p>
                                            </Row>
                                        </Card.ImgOverlay>
                                    </Card>
                                </a>;
                            })}
                        </CardColumns>
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