import React, { Component } from 'react';
import logo from './logo.svg';
import _ from 'lodash';
import { db } from './firebase';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };

    _.bindAll(this, 'onChange');
  }

  post() {
    console.log('hello');
    db.collection('posts').add({
      message: this.state.message,    
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({
      message: event.target.value,
    });
  }

  render() {
    let { message } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <input value={message} onChange={this.onChange} />
        <button onClick={this.post}>post</button>

      </div>
    );
  }
}

export default App;
