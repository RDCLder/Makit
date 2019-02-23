import React from 'react';
import { Container, Row} from "react-bootstrap";
import { connect } from 'react-redux';
import actionSearchResults from "../actions/actionSearchResults";
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

    handleSubmitImage(event) {
        event.preventDefault();

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
                this.props.eventSearchResults(source, concepts);
            })
            .then(() => {
                this.props.history.push("/ingredients");
            })
    }

    handleSubmitVideo(event) {
        event.preventDefault();

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
                    Give me a direct link to a file on the web.
                </Row>
                <Row className="row justify-content-center">
                    <input type="text" value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Image/Video Link"
                        id="inputLink" />
                </Row>
                <Row className="row justify-content-center">
                    {/* <Link onClick={this.handleSubmitImage} className="submitLink"> */}
                    <button className="submitButton" onClick={this.handleSubmitImage}>
                        IMAGE
                    </button>
                    {/* </Link> */}
                    {/* <Link onClick={this.handleSubmitVideo} className="submitLink"> */}
                    <button className="submitButton" onClick={this.handleSubmitVideo}>
                        VIDEO
                    </button>
                    {/* </Link> */}
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
        eventSearchResults: (source, ingredients) => dispatch(actionSearchResults(source, ingredients))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);