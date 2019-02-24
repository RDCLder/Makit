import React from 'react';
import { Container, Row} from "react-bootstrap";
import { connect } from 'react-redux';
import actionIngredientResults from "../actions/actionIngredientResults";
import "../styles/Main.css";
import Clarifai from "clarifai";

const app = new Clarifai.App({
    apiKey: "bb889326557142e19e9f735c30c1bce9"
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitImage = this.handleSubmitImage.bind(this);
        this.handleSubmitVideo = this.handleSubmitVideo.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmitImage() {

        // Using Clarifai API
        app.models.initModel({ id: Clarifai.FOOD_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
            .then(foodModel => {
                return foodModel.predict(this.state.value);
            })
            .then(response => {
                var concepts = response['outputs'][0]['data']['concepts'].filter(ingredient => {
                    let unwanted = ["no person", "breakfast", "lunch", "dinner", "unhealthy", "ready",
                        "nutrition", "food", "delicious", "cooking"
                    ];
                    return ingredient.value >= 0.9 && !unwanted.includes(ingredient.name);
                });
                let source = {
                    type: "image",
                    link: this.state.value
                };
                this.props.eventIngredientResults(source, concepts);
            })
            .then(() => {
                this.props.history.push("/ingredients");
            })
    }

    handleSubmitVideo() {

        // Using Clarifai API
        app.models.predict(
            Clarifai.FOOD_MODEL,
            this.state.value,
            { video: true, sampleMs: 1000 })
            .then(response => {
                let frames = response['outputs'][0]['data']['frames'];
                frames.forEach(frame => {
                    console.log('Concepts in frame at time: ' + frame['frame_info']['time'] + 'ms');
                    frame['data']['concepts'].forEach(concept => {
                        console.log(' ' + concept['name'] + ' ' + concept['value']);
                    });
                });
                frames = frames.filter(ingredient => {
                    let unwanted = ["no person", "breakfast", "lunch", "dinner", "unhealthy", "ready",
                        "nutrition", "food", "delicious", "cooking"
                    ];
                    return ingredient.value >= 0.9 && !unwanted.includes(ingredient.name);
                })
                let source = {
                    type: "video",
                    link: this.state.value
                };
                this.props.eventSearchResults(source, frames);
            })
            .then(() => {
                this.props.history.push("/ingredients");
            })
            .catch(error => {
                console.log('Error status code: ' + error.data['status']['code']);
                console.log('Error description: ' + error.data['status']['description']);
                if (error.data['status']['details']) {
                    console.log('Error details: ' + error.data['status']['details']);
                }
            });
    }

    render() {
        return (
            <Container className="homeContainer">
                <Row className="row justify-content-center" id="topRow">
                    <h3>Image/Video Link</h3>
                </Row>
                <Row className="row justify-content-center">
                    <h5>Give me an image or video of food, and I'll guess its ingredients!</h5>
                </Row>
                <Row className="row justify-content-center">
                    <input type="text" value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Image/Video Link"
                        id="inputLink" />
                </Row>
                <Row className="row justify-content-center">
                    <button className="submitButton" onClick={this.handleSubmitImage}>
                        IMAGE
                    </button>
                    <button className="submitButton" onClick={this.handleSubmitVideo}>
                        VIDEO
                    </button>
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
        eventIngredientResults: (source, ingredients) => dispatch(actionIngredientResults(source, ingredients))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);