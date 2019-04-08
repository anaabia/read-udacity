import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

const logger = (store) => (next) => (action) => {
    console.group(action.type)
      console.log('The action: ', action)
      const returnValue = next(action)
      console.log('The new state: ', store.getState())
    console.groupEnd()
    return returnValue
  }

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));