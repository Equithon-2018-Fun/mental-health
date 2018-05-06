import React, { Component } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        // On success
        // The signed-in user info.
        const user = result.user;
        
        // redirect to dashboard page
        this.props.history.push('/dashboard');
      }).catch(error => {
        // TODO: Handle errors

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
      });
  }

  render() {
    // Get the fonts working here
    return (      
      <div>
        <ul className="bar">
          <li><img className="logo" src={require('../Photos/NewLogo.png')} alt="logo"/></li>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li style={{float: 'right'}}><a onClick={this.googleLogin}>Login</a></li>
        </ul>

        <div className="main">
            <div id="home" className="home">
                <p className="welcome">Welcome to iSteem!</p>
                <button className="btn" type="button">Get Started</button>
            </div>

            <div id="features" className="features">
                <p className="title">Features</p>
                <p>Relative Mood Ratings:<br/>These mood ratings are always relative to how you were feeling the last time you checked in. This way, you can gain a better understanding of your moods over time.<br/>
                    <br/>Accomplishments:<br/>Put in any accomplishment or small thing that went well everyday! These will show up afterwards so you can have a nice trip down memory lane.
                </p>
            </div>

            <div id="about" className="about">
                <p className="title">About Us</p>
                <p>iSteem is a platform that specficially does not allow for sharing of content. Everything that you put on here, is only for you to see.<br/><br/>
                    The biggest problem facing us today is that everything is always in comparison to others. Something great happened in your life,
                    but you look on social media and it seems that someone else has done something even better.
                    This perpetual cycle of comparison is what leads to poor self-esteem, and a lack of worth.<br/><br/>
                    We want to change that. Why not have a platform where you can just post things for yourself?
                    Record what awesome things have happened in your life, without ever having to worry about what others will think.<br/><br/>
                    We hope that through iSteem, you'll be able to learn to see things from a greater perspective,
                    and appreciate all the amazing things that you do everyday in your life. </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;

