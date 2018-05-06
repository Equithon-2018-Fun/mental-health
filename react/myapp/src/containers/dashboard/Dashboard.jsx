import React, { Component } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import _ from 'lodash';
import moment from 'moment';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      photoURL: "",
      message: "",
      mood: null,
      posts: [],
    };

    // Check if user is signed in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Get all of users info and update state
        let posts = [];
        const query = db.collection('posts').where('uid', '==', user.uid);
        query.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              posts.push(doc.data());
            });

            this.setState({
              uid: user.uid,
              name: user.displayName,
              photoURL: user.photoURL,
              posts,
            });
            console.log(this.state.posts);
          })
          .catch(err => {
            alert('Error: Unable to retrieve users');
            console.log('Err: ', err);
          });
      } else {
        this.props.history.replace('/');
      }
    });

    _.bindAll(this, 'textChange', 'submit');
  }

  textChange(event) {
    this.setState({
      message: event.target.value,
    });
    console.log(this.state.message);
  }

  submit() {
    db.collection('posts').add({
      uid: this.state.uid,
      message: this.state.message,
      mood: 0,
      createdAt: Date.now(),
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }

  signout() {
    firebase.auth().signOut().then(() => {
      this.props.history.replace('/');
    }).catch(err => {
      console.log('Err: ', err);
    });
  }

  render() {
    const { posts } = this.state;
    console.log(posts);

    return (
      <div className="full">
        <div className="header"></div>
        <div className="welcome">
          <img src={this.state.photoURL} alt="Profile picture" />
          <h1 className="title-font">Hello {this.state.name}! </h1>
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

          
          {/* Note: Where information is past information is presented */}
          { posts && posts.map((post, id) => 
            <div key={id}>
              <span>{post.message}</span>
              <span>{post.mood}</span>
              <span>Posted On: {moment(post.createdAt).format("MMM Do YY")} </span>
              <span></span>
            </div>
            )
          }  
        </div>
        
        <div className="footer"><a onClick={this.signout} className="logout">Logout</a></div>
      </div>
    );
  }
}

export default Dashboard;
