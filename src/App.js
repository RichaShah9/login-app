import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.history.replace('/loginform');
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
