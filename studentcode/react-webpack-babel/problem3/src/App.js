import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
height: 25px; 
width: 75px
`;

class App extends Component {
  testNum = ()=> {
    if (document.querySelector("#input").value === "42") return alert("You guessed correctly!");
    else return alert ("Wrong guess :(")
  }
 
 
render() {
 return (
    <div className="App">
      <div><input id="input"></input></div>
       <Button onClick={this.testNum}>click</Button>
     </div>
   );
 }
}

export default App;