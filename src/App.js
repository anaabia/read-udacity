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

class App extends Component {

  componentDidMount(){
    this.props.loadAllPosts()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            <Route path='/' exact component={PageView} />
            <Route path='/:category' exact component={PageView} />
            <Route path='/:category/:post_id' exact component={Post}/>
            <Route path='/newPost' exact component={NewForm}/>
            <Route path='/newPost/:id' exact component={NewForm}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      loadAllPosts:  () => {
        dispatch(handleAllPosts())
      }
  }
}
export default connect(null,mapDispatchToProps)(App)