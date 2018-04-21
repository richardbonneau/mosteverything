import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
width: 125px;
height: 30px;
color: black;
font-color: white;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Button></Button>
      </div>
    );
  }
}

export default App;
