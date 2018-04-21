import React, { Component } from 'react';
import './App.css';

class App extends Component {
  addToList = ()=> {
    var newLine = document.createElement('li');
    newLine.innerHTML = document.querySelector('#inputField').value;
    document.querySelector('#ul').appendChild(newLine)
  }

  render() {
    return (
      <div className="App">
      <div> <input id='inputField' /> <button onClick={this.addToList}style={{width: '75px', height: '35px'}}>Add to List</button></div>

      <ul id='ul'>
      </ul>
      </div>
    );
  }
}

export default App;
