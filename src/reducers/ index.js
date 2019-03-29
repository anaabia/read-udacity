import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import category from './category'
import post from './post'
import comments from './comments'

export default combineReducers({
    category,
    post,
    comments,
    loadingBar: loadingBarReducer,
})