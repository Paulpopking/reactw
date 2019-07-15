import React, { Component } from 'react';

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

export default Clock;
