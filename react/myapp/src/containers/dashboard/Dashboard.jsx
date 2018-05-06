import React, { Component } from 'react';
import { db } from '../../firebase';
import './Dashboard.css';

class Dashboard extends Component {

  render() {
    return (
      <div class="full">
        <div class="header"></div>
        <div class="welcome">
          <h1 class="title-font">Hello! </h1>
        </div>
        <div class="input-info">
          <h3 class="title-font">How was your day?</h3>
          <form>
            <span>Input an achievement: </span>
            <br/><br/>
            <textarea name="comment" form="usrform" placeholder="Something positive, like winning a competition or an awesome vacation!" cols={3} rows={3}></textarea>
            <br/>
            <h3 class="title-font">How is your mood compared to last time you checked in?</h3>
            <div class="message"><span class="message-text" /></div>
            <div class="btn-group">
              <label class="btn active">
              <input type="radio" name="options" id="option1" value="1" />
              <label for="option1">
                <span class="btn">Worse...</span>
              </label>
              </label>
              <label class="btn">
              <input type="radio" name="options" id="option2" value="2" />
              <label for="option2">
                <span class="btn">Meh...</span>
              </label>
              </label>
              <label class="btn">
              <input type="radio" name="options" id="option3" value="3" />
                <label for="option3">
                  <span class="btn">The same</span>
                </label>
              </label>
              <label class="btn">
                <input type="radio" name="options" id="option4" value="4" />
                <label for="option4">
                  <span class=" btn">A bit better!</span>
                </label>
              </label>
              <label class="btn">
                <input type="radio" name="options" id="option5" value="5" />
                <label for="option5">
                  <span class=" btn">Way better!</span>
                </label>
              </label>
            </div>
            <br/>
            <input type="submit" name="go" value="Submit" />
          </form>
        </div>
        <div class="life" class="contents">
          <h3 class="title-font">Your Life In Review</h3>
          <span>View all the great things that have happened to you!</span>
          <hr/>
        </div>
        <div class="footer"><a href="#" class="logout">Logout</a></div>
      </div>
    );
  }
}

export default Dashboard;
