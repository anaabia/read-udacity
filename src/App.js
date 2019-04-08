import React, { Component, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Nav from './components/Nav';
import PageView from './components/PageView';
import Post from './components/Post';

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            <Route path='/' exact component={PageView} />
            <Route path='/:category' exact component={PageView} />
            <Route path='/:category/:id' exact component={Post}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default (App)