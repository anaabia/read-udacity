import {
    RECEIVE_ALL_COMMENTS,
    ADD_COMMENTS,
    UPDATE_COMMENTS,
    DELETE_COMMENTS,
    VOTE_COMMENTS
} from '../actions/comments'
import { UP_VOTE } from '../constants/util';

export default posts = (states = {}, action) => {
    switch(action.types){
        case ADD_COMMENTS:
            return {
                ...states,
                ...states.comments.concat(action.comments)
            }
        case RECEIVE_ALL_COMMENTS:
            return {
                ...states,
                ...action.comments
            }
        case UPDATE_COMMENTS:
            return {
                ...states,
                [action.commentId]: {
                    ...state[action.commentId],
                    ...action.comment
                }
            }
        case DELETE_COMMENTS:
            return {
                ...states,
                ...states.comments.filter(comment => comment !== action.commentId)
            }
        case VOTE_COMMENTS:
            return {
                ...states,
                [action.commentId]:{
                    ...states[action.commentId],
                    voteScore: [action.commentId].voteScore + (action.vote === UP_VOTE ? 1 : -1)
                }
            }
        default :
        return states;
    }
}