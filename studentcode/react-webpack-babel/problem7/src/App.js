import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {countdownNum: 0}
  }

  countdown = ()=> {
    let startCountdown = ()=> {

    if(document.querySelector('#inputField').value <= 0) {
      //clearInterval(clearInterval);
      return;
    }

    document.querySelector('#inputField').value -=1
      this.setState({
        countdownNum: parseInt(document.querySelector('#inputField').value)
      })
    }
    let clearInterval = setInterval(startCountdown, 1000);
  }
  render() {
    return (
      <div className="App">
      <h1>Countdown: {this.state.countdownNum}</h1>
      <div>
      <input id='inputField' style={{textAlign: 'center'}}></input>
      </div>
      <button onClick={this.componentWillUpdatecountdown} style={{height: '30px', width: '130px'}}>Start</button>
      </div>)
  }
}

export default App;

import Biggify from './Biggify.js'
class App extends Component {
  render() {
    return (<Biggify
        bigText="Big"/>);
  }
}
