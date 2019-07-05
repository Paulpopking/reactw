import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Game from './TicTacToe/TicTacToe';
import Clock from './Clock/Clock';

function AppRouter() {
    return (
        <Router>
            <Link to="/">Home</Link>
            <Link to="/ttt">Tic Tac Toe</Link>
            <Link to="/clock">Clock</Link>
            <Route exact={true} path="/" component={Home} />
            <Route path="/ttt/" component={Game} />
            <Route path="/clock/" component={Clock} />
        </Router>
    );
}

function Home() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to my website!</p>
            <a className="App-link" href="https://reactjs.org" 
                target="_blank" rel="noopener noreferrer">
                Built with React
            </a>
        </div>
    );
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <AppRouter />
                </header>
            </div>
        );
    }
}

export default App;
