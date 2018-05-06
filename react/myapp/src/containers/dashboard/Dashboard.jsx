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
      uid: '',
      name: '',
      photoURL: '',
      message: '',
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
              posts.push({id: doc.id, ...doc.data()});
            });

            this.setState({
              uid: user.uid,
              name: user.displayName,
              photoURL: user.photoURL,
              posts,
            });
          })
          .catch(err => {
            alert('Error: Unable to retrieve users');
            console.log('Err: ', err);
          });
      } else {
        this.props.history.replace('/');
      }
    });

    _.bindAll(this, 'textChange', 'submit', 'moodHandler', 'deletePost');
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
      mood: this.state.mood,
      createdAt: Date.now(),
    }).then(ref => {
      this.setState({
        message: '',
        mood: null,
      })
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

  moodHandler(event) {
    this.setState({
      mood: event.target.value,
    });
  }

  deletePost(post) {
    console.log('post', post.id);
    db.collection('posts').doc(post.id).delete()
      .then(() => {
        const posts = this.state.posts;
        _.remove(posts, p => p.id == post.id);
        this.setState({
          posts,
        });
      })
      .catch(err => {
        console.log('Err: ', err);
      });

  }

  render() {
    const { posts } = this.state;
    
    console.log(posts);

    const moodMap = [
      'Worse...',
      'Meh...',
      'The same.',
      'A bit better!',
      'Way better!',
    ];

    return (
      <div className="body">
        <div className="full">
          <div className="header"></div>
          <div className="welcome_header">
            <h1 className="title-font">Hello {this.state.name}! </h1>
            <span>Welcome to your iSteem Dashboard! Here you can see all your great memories, and add new ones!</span>
            <br/>
            <hr/>
            <span>Try to find something good to add to iSteem every day, even when it seems grim. It's important to remember that everyday can be a great day, and that even when you feel down, tomorrow is a new slate ♥</span>
          </div>
          <div className="input-info">
          {/* TODO: Form validation - require them to fill out both before adding to profile */}
            <h1 className="title-font">How are you? </h1>
            
              <h3 className="title-font">Input an achievement: </h3>
              <span>Something positive or a good memory that you want to remember! It can be anything; this is your life! </span>
              <br/>
              <br/>
              <textarea
                name="comment"
                placeholder="Winning a competition, going on vacation, etc..."
                cols={3}
                rows={3}
                value={this.state.message}
                onChange={this.textChange}
              />
              <h3 className="title-font">How is your mood compared to last time you checked in? {moodMap[this.state.mood]}</h3>
              <div className="message"><span className="message-text"></span></div>
              <div className="btn-group">
                <label className="btn1">
                <input type="radio" name="options" id="option1" value="0" onClick={this.moodHandler}/>
                <label htmlFor="option1">
                  <span>Worse...</span>
                </label>
                </label>
                <label className="btn2">
                <input type="radio" name="options" id="option2" value="1" onClick={this.moodHandler}/>
                <label htmlFor="option2">
                  <span>Meh...</span>
                </label>
                </label>
                <label className="btn3">
                <input type="radio" name="options" id="option3" value="2" onClick={this.moodHandler}/>
                <label htmlFor="option3">
                  <span>The same.</span>
                </label>
                </label>
                <label className="btn4">
                <input type="radio" name="options" id="option4" value="3" onClick={this.moodHandler}/> <label htmlFor="option4">
                  <span>A bit better!</span>
                </label>
                </label>
                <label className="btn5">
                <input type="radio" name="options" id="option5" value="4" onClick={this.moodHandler}/> <label htmlFor="option5">
                  <span>Way better!</span>
                </label>
                </label>
              </div>
              <br/>
              <input type="submit" name="go" value="Add to Profile" onClick={this.submit} />
          </div>
          <div className="life">
            <h1 className="title-font">Your Life In Review</h1>
            <span>View all the great things that have happened to you!</span>
            <hr/>
            <table style={{width: '100%', textAlign: 'center'}}>
              <tr>
                <th className="postMessageCol"><h3>Message</h3></th>
                <th><h3>Last Mood</h3></th>
                <th><h3>Date Posted</h3></th>
                <th></th>
              </tr>
              { posts && _.sortBy(posts, ['createdAt']).map((post, id) => 
                  <tr key={id}>
                    <td>{post.message || ''}</td>
                    <td>{moodMap[post.mood - 1] || ''}</td>
                    <td>Posted On: {moment(post.createdAt).format("MMM Do YYYY")}</td>
                    <td className="deleteBtn" onClick={() => this.deletePost(post)}>Remove</td>
                  </tr>
                )
              }  
            </table>
          </div>
          <div className="footer">
            <a onClick={this.signout} className="logout">Logout</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
