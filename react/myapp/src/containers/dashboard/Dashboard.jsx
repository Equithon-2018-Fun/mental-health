import React, { Component } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import _ from 'lodash';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: "",
      mood: null,
    };

    // Check if user is signed in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user.uid,
        });
      } else {
        this.props.history.replace('/');
      }
    });

    _.bindAll(this, 'handleSubmit', 'textChange', 'submit');
  }
  
  submit() {
    db.collection('posts').add({
      user: this.state.user,
      message: this.state.message,
      mood: 0,
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }
  
  handleSubmit(event) {
    console.log(event);
    // db.collection('posts').add({
    //   message: this.state.message,
    //   mood: this.state.mood,
    // }).then(ref => {
    //   console.log('Added document with ID: ', ref.id);
    // });
  }


  textChange(event) {
    this.setState({
      message: event.target.value,
    });
    console.log(this.state.message);
  }

  render() {
    return (
      <div className="full">
        <div className="header"></div>
        <div className="welcome">
          <h1 className="title-font">Hello! </h1>
        </div>
        <div className="input-info">
          <h3 className="title-font">How was your day?</h3>
          <textarea
            placeholder="Something positive, like winning a competition or an awesome vacation!"
            cols={3}
            rows={3}
            value={this.state.message}
            onChange={this.textChange}
          />
          <button onClick={this.submit}>Submit</button>

          {/* <form onSubmit={this.handleSubmit}>
            <span>Input an achievement: </span>
            <br/><br/>
            <textarea
              name="comment"
              form="usrform"
              placeholder="Something positive, like winning a competition or an awesome vacation!"
              cols={3}
              rows={3}
              value={this.state.message}
              onChange={this.textChange}
            >
            </textarea>
            <br/>
            <h3 className="title-font">How is your mood compared to last time you checked in?</h3>
            <div className="message"><span className="message-text" /></div>
            <div className="btn-group">
              <label className="btn active">
              <input type="radio" name="options" id="option1" value="1" />
              <label for="option1">
                <span className="btn">Worse...</span>
              </label>
              </label>
              <label className="btn">
              <input type="radio" name="options" id="option2" value="2" />
              <label for="option2">
                <span className="btn">Meh...</span>
              </label>
              </label>
              <label className="btn">
              <input type="radio" name="options" id="option3" value="3" />
                <label for="option3">
                  <span className="btn">The same</span>
                </label>
              </label>
              <label className="btn">
                <input type="radio" name="options" id="option4" value="4" />
                <label for="option4">
                  <span className="btn">A bit better!</span>
                </label>
              </label>
              <label className="btn">
                <input type="radio" name="options" id="option5" value="5" />
                <label for="option5">
                  <span className=" btn">Way better!</span>
                </label>
              </label>
            </div>
            <br/>
            <input type="submit" name="go" value="Submit" />
          </form> */}
        </div>
        <div className="life" className="contents">
          <h3 className="title-font">Your Life In Review</h3>
          <span>View all the great things that have happened to you!</span>
          <hr/>
        </div>
        <div className="footer"><a href="#" className="logout">Logout</a></div>
      </div>
    );
  }
}

export default Dashboard;
