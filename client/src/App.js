import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React Client</p>
        <a
          className="App-link"
          href="localhost:5000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Express Server
        </a>
      </header>
    </div>
  );
}

export default App;
