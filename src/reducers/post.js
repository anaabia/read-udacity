import {
    RECEIVE_ALL_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST
} from '../actions/post'
import { UP_VOTE } from '../constants/util';

export default posts = (states = {}, action) => {
    switch(action.types){
        case ADD_POST:
        return {
            ...states,
            ...states.posts.concat(action.posts)
        }
    case RECEIVE_ALL_POST:
        return {
            ...states,
            ...states.posts.concat(action.posts)
        }
    case UPDATE_POST:
        return {
            ...states,
            [action.postId]: {
                ...state[action.postId],
                ...action.post
            }
        }
    case DELETE_POST:
        return {
            ...states,
            ...states.posts.filter(post => post !== action.postId)
        }
    case VOTE_POST:
        return {
            ...states,
            [action.postId]:{
                ...states[action.postId],
                voteScore: [action.postId].voteScore + (action.vote === UP_VOTE ? 1 : -1)
            }
        }
        default :
        return states;
    }
}