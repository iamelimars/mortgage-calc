import React, { Component } from 'react';
import './App.scss';
import backgroundImg from '../assets/background.jpg'

import FormContainer from './FormContainer'

const backgroundStyle = {
    backgroundImage: `url('${backgroundImg}')`,
    maxWidth: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}

class App extends Component {

  handleSubmit = event => {
    console.log(event);
    
  }

  render() {
    return (
      <div className="App">
        <div className="container" style={backgroundStyle}>
          <FormContainer />
        </div>
      </div>
    );
  }
}

export default App;
