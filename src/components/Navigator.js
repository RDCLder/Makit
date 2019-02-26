import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actionReset from "../actions/actionReset";
import "../styles/Main.css";

class Navigator extends React.Component {

    render() {
        return (
            <div>

                <Row id="header">
                    <Col xs={2}>
                        {/* <Link to="/" className="link"> */}
                        <h2>MAKIT</h2>
                        {/* </Link> */}
                    </Col>
                    <Col>
                        <h4>
                            <Link to="/">
                                Link
                            </Link>
                        </h4>
                    </Col>
                    <Col>
                        <h4>
                            <Link to="/ingredients">
                                Ingredients
                        </Link>
                        </h4>
                    </Col>
                    <Col>
                        <h4>
                            <Link to="/recipes">
                                Recipes
                        </Link>
                        </h4>
                    </Col>
                    <Col>
                        <h4>
                            <Link to="/locations">
                                Locations
                        </Link>
                        </h4>
                    </Col>
                    <Col>
                        <h4>
                            <Link to="/" onClick={this.props.eventReset}>
                                Reset
                        </Link>
                        </h4>
                    </Col>
                    <Col xs={2}></Col>
                </Row>

                {/******* LINK BUTTON ********/}
                <Link to="/">
                    <button type="button" className="btn floatButton" id="linkButton">
                        <i className="fas fa-camera"></i>
                    </button>
                </Link>

                {/******* INGREDIENTS BUTTON ********/}
                <Link to="/ingredients">
                    <button type="button" className="btn floatButton" id="ingredientsButton">
                        <i className="fas fa-egg"></i>
                    </button>
                </Link>

                {/******* RECIPES BUTTON ********/}
                <Link to="/recipes">
                    <button type="button" className="btn floatButton" id="recipesButton">
                        <i className="fas fa-book-open"></i>
                    </button>
                </Link>

                {/******* LOCATIONS BUTTON ********/}
                <Link to="/locations">
                    <button type="button" className="btn floatButton" id="locationsButton">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
                </Link>

                {/******* RESET BUTTON ********/}
                <Link to="/" onClick={this.props.eventReset}>
                    {/* <Link to="/"> */}
                    <button type="button" className="btn floatButton" id="resetButton">
                        <i className="fas fa-times"></i>
                    </button>
                </Link>

                <Row id="footer">
                    <h4>Powered by <a href="https://clarifai.com/" target="_blank" rel="noopener noreferrer">Clarifai</a> and <a href="https://www.edamam.com/" target="_blank" rel="noopener noreferrer">
                        Edamam
                        </a>
                    </h4>
                </Row>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        source: state.source,
        ingredients: state.ingredients
    }
}

function mapDispatchToProps(dispatch) {
    return {
        eventReset: () => dispatch(actionReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);