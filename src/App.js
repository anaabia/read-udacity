import React, { Component, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
