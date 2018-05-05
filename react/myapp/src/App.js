import React, { Component } from 'react';
import logo from './logo.svg';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './containers/home/Home';
import Dashboard from './containers/dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/dashboard' component={Dashboard}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;