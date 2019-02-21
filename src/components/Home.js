import React from 'react';
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/Main.css";
import Clarifai from "clarifai";

const app = new Clarifai.App({
    apiKey: "bb889326557142e19e9f735c30c1bce9"
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
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
                var concepts = response['outputs'][0]['data']['concepts'].filter((ingredient) => {
                    return ingredient.value >= 0.9;
                });
                console.log(concepts);
                // dispatch()
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
                <Row className="homeRow justify-content-center" id="topRow">
                    <h3>Image/Video Link</h3>
                </Row>
                <Row className="homeRow justify-content-center">
                    Give me a direct link to a file on the web.
                </Row>
                <form id="linkForm" onSubmit={this.handleSubmitImage}>
                    <Row className="homeRow justify-content-center">
                        <input type="text" value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="Image/Video Link"
                            id="inputLink"
                        />
                    </Row>
                    <Row className="homeRow justify-content-center">
                        <button type="submit" className="submitButton">IMAGE</button>
                        <button type="submit" className="submitButton"
                            onClick={this.handleSubmitVideo}>VIDEO</button>
                    </Row>
                </form>
            </Container>
        );
    }
}

export default Home;