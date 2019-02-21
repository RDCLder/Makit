import React from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Main.css";

class Base extends React.Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        return (
            <Container fluid="true" id="baseContainer">

                <Row id="header">
                    <Link to="/" className="headerTab">
                        <h2>MAKIT</h2>
                    </Link>
                    <Link to="/" className="headerTab">
                        <h4>Link</h4>
                    </Link>
                    <div className="headerTab">
                        <h4>|</h4>
                    </div>
                    <Link to="/ingredients" className="headerTab">
                        <h4>Ingredients</h4>
                    </Link>
                    <div className="headerTab">
                        <h4>|</h4>
                    </div>
                    <Link to="/recipes" className="headerTab">
                        <h4>Recipes</h4>
                    </Link>
                    <div className="headerTab">
                        <h4>|</h4>
                    </div>
                    <Link to="/locations" className="headerTab">
                        <h4>Locations</h4>
                    </Link>
                    <div className="headerTab">
                        <h4>|</h4>
                    </div>
                    <Link to="/" className="headerTab">
                        <h4>Reset</h4>
                    </Link>
                </Row>

                {/******* LINK BUTTON ********/}
                <Link to="/">
                    <button type="button" className="btn floatButton" id="linkButton">
                        <i class="fas fa-link"></i>
                    </button>
                </Link>

                {/******* INGREDIENTS BUTTON ********/}
                <Link to="/ingredients">
                    <button type="button" className="btn floatButton" id="ingredientsButton">
                        <i class="fas fa-egg"></i>
                    </button>
                </Link>

                {/******* RECIPES BUTTON ********/}
                <Link to="/recipes">
                    <button type="button" className="btn floatButton" id="recipesButton">
                        <i class="fas fa-utensils"></i>
                    </button>
                </Link>

                {/******* LOCATIONS BUTTON ********/}
                <Link to="/locations">
                    <button type="button" className="btn floatButton" id="locationsButton">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
                </Link>

                {/******* RESET BUTTON ********/}
                <Link to="/">
                    <button type="button" className="btn floatButton" id="resetButton">
                        <i class="fas fa-times"></i>
                    </button>
                </Link>

                {this.props.children}

                <Row id="footer">
                    <h4>Powered by Clarifai and Edamam</h4>
                </Row>

            </Container >
        );
    }
}

export default Base;