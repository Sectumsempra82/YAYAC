import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Routes from './Routes/Routes'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Routes/>
      </div>
    )
    return (
        <App/> 
    );
  }
}

export default App;
