import React, { Component } from 'react';
import './TicTacToe.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        boxes: [a, b, c],
      };
    }
  }
  return null;
}

// Component Square defined as a function
function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i, win) {
    return (
      <Square
        key={i % 3}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        style={win ? { background: 'yellow' } : { background: 'white' }}
      />
    );
  }

  render() {
    let row, col;
    let rows = [];
    const [box1, box2, box3] = this.props.winCoord;
    for (row = 0; row < 3; row++) {
      let box = [];
      for (col = 0; col < 3; col++) {
        const i = col + row * 3;
        const win = i === box1 || i === box2 || i === box3;
        box.push(this.renderSquare(i, win));
      }
      rows.push(<div key={row} className="board-row">{box}</div>);
    }
    return <div>{rows}</div>;
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: {
          col: null,
          row: null
        }
      }],
      stepNumber: 0,
      xIsNext: true,
      toggle: false,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState((state, props) => ({
      history: history.concat([{
        squares: squares,
        coord: {
          col: i % 3,
          row: Math.floor(i / 3)
        }
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const toggle = this.state.toggle;
    const toggleHistory = toggle ? history.slice(0).reverse() : history.slice(0);

    const moves = toggleHistory.map((step, move) => {
      move = toggle ? history.length - move - 1 : move;
      const desc = move ? 'Go to move #' + move + ' at row ' + (step.coord.row + 1) + ', col ' + (step.coord.col + 1) : 'Go to game start';
      return (
        <li key={move}>
          <button className={stepNumber === move ? 'bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else if (stepNumber === 9) {
      status = 'Draw';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winCoord={winner ? winner.boxes : [null, null, null]}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.setState((state, props) => ({ toggle: !state.toggle }))}>Toggle Moves</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
