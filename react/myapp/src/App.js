import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ul id="bar">
          <li><img className="logo" src="https://mticenter.com/mtopm/wp-content/uploads/2017/05/happy-face.png" alt="logo"/></li>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li style={{float: 'right'}}><a href="https://accounts.google.com/ServiceLogin">Login</a></li>
        </ul>

        <div className="main">
          <div id="home">
            <img src="https://mticenter.com/mtopm/wp-content/uploads/2017/05/happy-face.png" alt="Logo" width="100%" />
          </div>

          <div id="features">
            <p className="title">Features</p>
            <p>content</p>
          </div>

          <div id="about">
            <p className="title">About Us</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
