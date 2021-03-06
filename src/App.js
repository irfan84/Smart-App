import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank.";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
    apiKey: '395123ba500145a48c8edad7f328462b'
});

const particlesOptions = {
    particles: {
       number: {
           value: 200,
           density: {
               enable: true,
               value_area: 800
           }
       }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user:
        {
            id: '',
            name: '',
            email: '',
            entries: '',
            joined: ''
        }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;

    }

    loadUser = (data) => {
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }})
    }


    calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFacebox = (box) => {
    this.setState({box: box})
    }

    onRouteChange = (route) => {
        if (route === 'home') {
        this.setState({isSignedIn: true});
        }
        else {
            this.setState(initialState);
        }
        this.setState({route: route})

    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                if (response) {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count}))
                        })
                        .catch(err => {
                            err.json('Error')
                        })

                }

                this.displayFacebox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
    }

    render() {
        const {imageUrl, box, route, isSignedIn} = this.state
        return (
            <div className="App">

                <Particles className={'particles'}
                           params={particlesOptions}/>

                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                { route === 'home' ?
                    <div>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange = {this.onInputChange}
                            onButtonSubmit = {this.onButtonSubmit} />
                        <FaceRecognition box={box} imageUrl = {imageUrl} />
                    </div>
                    : route === 'signin' ?
                        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

                }

            </div>
        );
    }
}

export default App;
