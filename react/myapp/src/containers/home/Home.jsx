import React, { Component } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import './Home.css';

// Update title and fonticon

class Home extends Component {
  componentWillMount() {
    // NOTE: hacky
    // Check if user is signed in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.replace('/dashboard');
      }
    });
  }

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
      <div className="body">
       <ul className="bar">
          <li><img className="logo" src={'https://i.imgur.com/vnyfMiF.png'} alt="logo" /></li>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#more">Future</a></li>
          <li><a href="#contact">Contact</a></li>
          <li style={{float: 'right'}}><a onClick={this.googleLogin}>Login</a></li>
        </ul>

        <div className="main">
          <div id="home" className="homeStyle">
            <p className="welcome">Welcome to iSteem!</p>
            <button className="btn" onClick={this.googleLogin}>Get Started</button>
          </div>
          <div id="features" className="featuresStyle" style={{padding: '70px'}}>
            <p className="title">Features</p>
            <p style={{paddingTop: '30px'}}><span className="bolder">Relative Mood Ratings:</span><br/>These mood ratings are always relative to how you were feeling the last time you checked in. This way, you can gain a better understanding of your moods over time.<br/>
              <br/><span className="bolder">Accomplishments:</span><br/>Put in any accomplishment or small thing that went well everyday! These will show up afterwards so you can have a nice trip down memory lane.
            </p>
          </div>

          <div id="about" className="aboutStyle" style={{padding: '70px'}}>
            <p className="title">About Us</p>
            <p style={{paddingTop: '30px'}}>iSteem is a platform that specifically does not allow for sharing of content. Instead, everything you put on your iSteem profile, is only for <em>you</em> to see.<br/><br/>
              <hr/><br/>
              <p className="title">Why?</p><br/>
              The biggest problem facing us today is that everything is always in comparison to others. Something great
              happened in your life, but you look on social media and it seems that someone else has done something even better. This perpetual cycle of comparison is what leads to poor self-esteem, and a lack of worth.<br/><br/> We want to change that. Why not
              have a platform where you can just post things for yourself? Record what awesome things have happened in your life, without ever having to worry about what others will think.<br/><br/> We hope that through iSteem, you'll be able to learn to see
              things from a greater perspective, and appreciate all the amazing things that you do everyday in your life. </p>
          </div>

          <div id="more" className="moreStyle">
            <p className="title">More Features On the Way</p>
            <div className="clearfix" style={{margin: '20px 100px', height: '500px'}}>
              <img src={'https://i.imgur.com/HWF1N4Q.png'} alt="monthly reflection" width="300px" height="450px" style={{float: 'left', margin: '20px'}} />
              <p className="title" style={{padding: '40px 20px 0px 390px'}}>Email Month Reflection</p>
              <p style={{paddingLeft: '100px', paddingRight: '20px', overflow: 'auto'}}>
                <br/><br/>Get a customized, email report sent to you every month!
                <br/><br/>It contains a graph tracking your highs and lows in mood throughout the month, as well as selecting different photos and text entries to showcase to you from the month.
              </p>
            </div>
          </div>
        </div>

        <footer id="contact">
          <p className="title">Contact Us</p>
          <p style={{textAlign: 'center'}}>Any questions? Any ideas? Email us at support@isteerm.ca!<br/></p>
        </footer>
      </div>
    );
  }
}

export default Home;

