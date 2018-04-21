import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
background-color: red;
width: 100px;
height: 50px;
color:white;
`;

class App extends Component {
  constructor(){
    super()
    this.state = {counter: 0};
  }
  randomizeText() {
    this.setState({counter : this.state.counter +=1})
  }
  render() {
    
    return <Button onClick={this.randomizeText}>{this.state.counter}</Button>
  }
}

export default App;
