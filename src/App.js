import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './TicTacToe/TicTacToe';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  // Set up lifecycle
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <div><h2>Current time is:</h2></div>
        <div><h2>{this.state.date.toLocaleTimeString()}</h2></div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to my website!
          </p>
          <Clock />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with React
          </a>
          <h2>React tutorial game</h2>
          <Game />
        </header>
      </div>
    );
  }
}

export default App;
