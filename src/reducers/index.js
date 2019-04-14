import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import categories from './category'
import posts from './post'
import comment from './comments'

export default combineReducers({
    categories,
    posts,
    comment,
    loadingBar: loadingBarReducer,
})