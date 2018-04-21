import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
      inputText: '',
      update: ''
    }
  }
 handleSubmit = (event) => {
   event.preventDefault();
   this.state.messageList.push("Richard: " + this.state.inputText);
   setTimeout(()=> {
     let botPossibleAnswers = ["Interesting.", "Oh that's cool", "Alright."];
     this.state.messageList.push("Emilie: " + botPossibleAnswers[Math.floor(Math.random()*3)]);
     this.setState({update: 0});
    }, 1000)
    setTimeout(()=> {
      let botPossibleAnswers = ["HEY!.", "Don't forget about me!", "Why do you only care about Emilie? :("];
      this.state.messageList.push("All of my other friends: " + botPossibleAnswers[Math.floor(Math.random()*3)]);
      this.setState({update: 0});
     }, 1500)
   this.setState({inputText: ''});
 }
 handleChange = (event) => {
   this.setState({inputText: event.target.value});
 }


  render() {
    return(
      <div className="App">
      <form onSubmit={this.handleSubmit}>
      <ul className='App'>
      {this.state.messageList.map((msg)=> <li>{msg}</li>)}        
      </ul>
        <input type='text' value={this.state.inputText} onChange={this.handleChange} />
        <input type='submit' value='submit' />
        </form>
        
      </div>
    )
  }
}
export default App;
