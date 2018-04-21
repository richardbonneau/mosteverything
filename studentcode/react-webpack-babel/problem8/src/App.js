import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      hasButtonBeenClicked: false
    }
  }
  render() {
    let addButton = ()=> {
      this.setState({hasButtonBeenClicked: this.state.hasButtonBeenClicked = true})

      if(this.state.hasButtonBeenClicked === true) {

        let newButton = <button id='button' onClick={addButton}>Click me</button>
      }
    }
    return (
      <div className="App">
      <button id='button' onClick={addButton}>Click me</button>
      
      </div>
    );
  }
}

export default App;
