import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      hasButtonBeenClicked: false,
      buttons: [<button onClick={this.addButton}>Click me</button>],
      bools: [false]
    }
    this.newButton = <button onClick={this.addButton}>Click me</button>
  }
  addButton = () => {
    if(this.state.bools.every((element)=> element == true)) {
      this.state.bools.push(false)
      this.state.buttons.push(this.newButton)
      this.setState({})
    }
  }
  render() {
    return (
      <div className="App">
      <div>{this.state.buttons}</div>
      </div>
    );
  }
}

export default App;
