import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstNameValue: "",
      lastNameValue: "",
      feedback: ""
  };
  }
  isFirstNameInputPopulated = false;
  isLastNameInputPopulated = false;
 
  handleChangeFirstName = (event) => {
    this.setState({firstNameValue: event.target.value});
    if(event.target.value !== '') {
      this.isFirstNameInputPopulated = true;
    } else this.isFirstNameInputPopulated = false;
  }
  handleChangeLastName = (event) => {
    this.setState({lastNameValue: event.target.value});
    if(event.target.value !== '') {
      this.isLastNameInputPopulated = true;
    } else this.isLastNameInputPopulated = false;

  }
  handleChangeFeedback = (event) => {
    this.setState({feedback: event.target.value});

  }
  handleSubmit = (event) => {
    alert('Hi ' + this.state.firstNameValue + ' ' + this.state.lastNameValue);
    event.preventDefault();
  }
  handleSubmitFeedback = (event) => {
    console.log(this.state.feedback.length())
    event.preventDefault();
    alert("Submitted " + this.state.feedback.length())
    
  }

  clearFields = () => {
    this.setState({
      firstNameValue: '',
      lastNameValue: ''
  })
  this.isFirstNameInputPopulated = false;
  this.isLastNameInputPopulated = false;
  }
  swapFields = () => {
    this.setState({
      firstNameValue: this.state.lastNameValue,
      lastNameValue: this.state.firstNameValue
    
    })
  }
 
  render = () => {
    return (

      <div style={{display: "flex"}}>
      <div className="hello" id="bye"></div>
      <form onSubmit={this.handleSubmit}>
      <div>
          First Name:
          <input type="text" value={this.state.firstNameValue} onChange={this.handleChangeFirstName} />
          </div>
          <div>
          Last Name:
          <input type="text" value={this.state.lastNameValue} onChange={this.handleChangeLastName} />
          </div>
          {
            this.isFirstNameInputPopulated && this.isLastNameInputPopulated ? 
          <input type="submit" value="Submit" />
          : <div />
          }
      </form>
      <button onClick={this.clearFields}>Clear</button>
      <button onClick={this.swapFields}>Swap</button>
      <form onSubmit={this.handleSubmitFeedback}>
      <div>
          Give us feedback on the page:
          <input type="text" value={this.state.feedback} style={{height: "70px"}} 
          onChange={this.handleChangeFeedback} />
          </div>
          {
            this.isFirstNameInputPopulated && this.isLastNameInputPopulated ? 
          <input type="submit" value="Submit Feedback" />
          : <div />
          }
      </form>
      </div>
    );
  }
 }

export default App;
