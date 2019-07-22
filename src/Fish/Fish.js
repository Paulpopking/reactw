import React, { Component } from 'react';

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      coord: {
        x: 0,
        y: 0,
      }
    }
  }
}

class Tank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      working: false,
      interval: {
        work: 50,
        rest: 10,
      },
      fish: [],
    };
    this.timer = null;
  }

  alert() {

  }

  componentDidMount() {
    this.timer = this.setInterval(() => {
      this.alert();
    }, this.state.interval.work * 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  generateFish() {

  }

  render() {
    return (
      <div>
        <label>选择连续工作时间</label>
        <input type="text" />
        <label>选择休息时间</label>
      </div>
    );
  }
}

export default Tank;
