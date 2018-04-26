import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messageListEmilie: [],
      messageListRosie: [],
      inputTextEmilie: '',
      inputTextRosie: '',
      username: '',
      inputUsername: '',
      renderUsernamePick: true,
      room: 'none'
    }
  }
  
  //  Bot Code Em
 handleSubmitEmilie = (event) => {
   event.preventDefault();
   this.state.messageListEmilie.push(this.state.username + ": " + this.state.inputTextEmilie);
   setTimeout(()=> {
     let botPossibleAnswers = ["Interesting.", "Oh that's cool", "Alright."];
     this.state.messageListEmilie.push("Emilie: " + botPossibleAnswers[Math.floor(Math.random()*3)]);
     this.setState({});
    }, 1000)
   this.setState({inputTextEmilie: ''});
 }
 handleChangeEmilie = (event) => {
   this.setState({inputTextEmilie: event.target.value});
 }
 // Bot code Rosie
 handleSubmitRosie = (event) => {
  event.preventDefault();
  this.state.messageListRosie.push(this.state.username + ": " + this.state.inputTextRosie);
  setTimeout(()=> {
    let botPossibleAnswers = [
"Coding. Robot. Javascript. Beep.", "Click here if you are not a robot", "I eat and drink like a human"];
    this.state.messageListRosie.push("Rosie: " + botPossibleAnswers[Math.floor(Math.random()*3)]);
    this.setState({});
   }, 1000)
  this.setState({inputTextRosie: ''});
}
handleChangeRosie = (event) => {
  this.setState({inputTextRosie: event.target.value});
}
 // Submit username Code
 handleSubmitUsername = (event) => {
   event.preventDefault();
   this.setState({username: this.state.inputUsername});
   this.setState({renderUsernamePick: false})
 }
 handleChangeUsername= (event) => {
   this.setState({inputUsername: event.target.value});
 }
 // Creating the individual chatrooms
 openEmilieChat = () => {
    this.setState({room: "em"})
 }
 openRosieChat = () => {
      this.setState({room: "jac"})
 }
  render() {
    return(
<div className="App">
{
  this.state.renderUsernamePick ?
      <form style={{textAlign: 'center'}} onSubmit={this.handleSubmitUsername}>
      <h1>Pick a username!</h1>
        <input type='text' value={this.state.inputUsername} onChange={this.handleChangeUsername} />
        <input type='submit' value='submit' />
        </form>
        : 
        
  <div style={{display: 'flex'}}>

        <ul style={{flexGrow:'.2'}} className="App">
        <li>
        <a href="#" onClick={this.openEmilieChat}>Emilie Chatroom</a>
        </li>
        <a href="#" onClick={this.openRosieChat}>Rosie Chatroom</a>
        </ul>

    <div style={{flexGrow:'0.2'}} />

      <div style={{flexGrow:'1'}}>

      {
        this.state.room === 'none' ? <div /> :
        this.state.room === "em" ?
        <form onSubmit={this.handleSubmitEmilie}>
        <h2>Thank you {this.state.username}. You may start chatting with Emilie!</h2>
        <ul className='App'>
        {this.state.messageListEmilie.map((msg)=> <li>{msg}</li>)}        
        </ul>
          <input type='text' value={this.state.inputTextEmilie} onChange={this.handleChangeEmilie} />
          <input type='submit' value='submit' />
          </form> 
          :  
          <form onSubmit={this.handleSubmitRosie}>
    <h2>Thank you {this.state.username}. You may start chatting with Rosie!</h2>
    <ul className='App'>
    {this.state.messageListRosie.map((msg)=> <li>{msg}</li>)}        
    </ul>
      <input type='text' value={this.state.inputTextRosie} onChange={this.handleChangeRosie} />
      <input type='submit' value='submit' />
      </form>
      }
</div>

  </div>
}
</div>
    )
  }
}
export default App;
