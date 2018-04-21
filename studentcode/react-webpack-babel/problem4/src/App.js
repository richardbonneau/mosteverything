import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {ranNum: Math.floor(Math.random()*100)}
  }
  isNumRight = ()=> {
    if(document.querySelector('#userInput').value > this.state.ranNum) return alert("Your guess is too high!");
    else if (document.querySelector('#userInput').value < this.state.ranNum) return alert ("Your guess is too low!");
    else return alert("You guessed correctly!")
  }
  render() {
    return (
      <div className="App">
      <input id="userInput"></input>
      <div><button onClick={this.isNumRight} style={{height: '25px', width: '50px'}}>Try</button></div>
      </div>
    );
  }
}


export default App;
