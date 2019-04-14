import React, { Component, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Nav from './components/Nav';
import PageView from './components/PageView';
import Post from './components/Post';
import NewForm from './components/NewForm';
import { connect } from 'react-redux';
import { handleAllPosts } from './actions/post';
import Category from './components/Category';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleAllPosts())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            <Route path='/' exact component={PageView} />
            <Route path='/category/:category' exact component={Category} />
            <Route path='/category/:category/:id' exact component={Post}/>
            <Route path='/newPost' exact component={NewForm}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(null)(App)