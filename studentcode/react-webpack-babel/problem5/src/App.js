import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
width: 400px;
height:50px;
`;

class App extends Component {
  constructor() {
    super()
    this.state = {
      showButtonOne : true,
      showButtonTwo : false
    }
  }
  buttonClick = ()=>{
    this.state.showButtonOne ? this.setState({
      showButtonOne : false,
    }) : this.setState({
      showButtonOne : true,
    })

  }
  render() {
      return (
      <div className="App">
      { 
        this.state.showButtonOne ?
      <div style={{width: '400px'}}>
      <Button onClick={this.buttonClick}>Button one</Button>
      </div>
      :
      <Button onClick={this.buttonClick}>Button two</Button>
    }

      </div>
    );
  }
}

export default App;
