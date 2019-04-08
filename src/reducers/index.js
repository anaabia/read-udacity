import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import categories from './category'
import posts from './post'
import comments from './comments'

export default combineReducers({
    categories,
    posts,
    comments,
    loadingBar: loadingBarReducer,
})