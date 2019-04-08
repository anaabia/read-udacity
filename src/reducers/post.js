import { mapKeys } from 'lodash'
import {
    RECEIVE_ALL_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST
} from '../actions/post'
import { UP_VOTE } from '../constants/util'

const posts = (state = {}, action) => {
    const { posts } =  action;
    switch(action.type){
        case ADD_POST:
        return {
            ...state, [posts.id]: posts
        }
    case RECEIVE_ALL_POST:
        return mapKeys(posts, (value, key) => value.id)
    case UPDATE_POST:
        return {
            ...state,
            [action.postId]: {
                ...state[action.postId],
                ...action.posts
            }
        }
    case DELETE_POST:
        return {
            ...state,
            ...state.posts.filter(post => post !== action.postId)
        }
    case VOTE_POST:
        return {
            ...state,
            [action.postId]: {
                ...state[action.postId],
                voteScore: action.vote === UP_VOTE ? state[action.postId].voteScore + 1 : state[action.postId].voteScore - 1
            }
        }
    default :
        return state;
    }
}
export default posts