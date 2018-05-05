import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    
    return (
      <div className="full">
        <div className="header"></div>
        <div className="welcome" className="contents">
          <h1 className="title-font">Hello! </h1>
        </div>
        <div className="input-info" className="contents">
          <h3 className="title-font">How was your day?</h3>
          <form>
            <span>Input an achievement: </span>
            <br/><br/>
            <textarea name="comment" form="usrform" placeholder="Something positive, like winning a competition or an awesome vacation!" cols={3} rows={3}>
            </textarea>
            <br/><br/>
          <h3 className="title-font">How's your mood compared to last time?</h3>
            <button type="button" value=""> Not So Good</button>
            <button type="button" value=""> About the Same</button>
            <button type="button" value=""> Better!</button>
            <br/>
            <br/>
            <br/>
            <input type="submit" name="go" value="Submit" />
          </form>
        </div>
        <div className="life" className="contents">
          <h3 className="title-font">Your Life In Review</h3>
          <span>View all the great things that have happened to you!</span>
          <hr />
        </div>
        <div className="footer"></div>
      </div> 
    );
  }
}

export default Dashboard;
