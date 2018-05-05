import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import { db } from './firebase';
import './App.css';

class App extends Component {

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      // The signed-in user info.
      const user = result.user;
      // redirect to dashboard page
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      // TODO: Handle errors
    });
  }

  render() {
    return (
      <div>
        <ul id="bar">
          <li><img className="logo" src="https://mticenter.com/mtopm/wp-content/uploads/2017/05/happy-face.png" alt="logo"/></li>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li style={{float: 'right'}}><a onClick={this.googleLogin}>Login</a></li>
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
