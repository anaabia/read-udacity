import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT
} from '../actions/comments'
import { UP_VOTE } from '../constants/util'

const comments = (states = [], action) => {
    switch(action.type){
        case ADD_COMMENT:
            return  [...states.concat(action.comment)]
        case UPDATE_COMMENT:
            return {
                ...states,
                [action.commentId]: {
                    ...states[action.commentId],
                    ...action.comment
                }
            }
        case DELETE_COMMENT:
            return {
                ...states,
                ...states.comments.filter(comment => comment !== action.commentId)
            }
        case VOTE_COMMENT:
            return [...states.map(comment => comment.id === action.commentId ? handleVote(comment, action.vote) : comment )]
        default :
        return states;
    }
}

const handleVote = (comment, vote) => {
    return {
        ...comment,
        voteScore: vote === UP_VOTE ? comment.voteScore + 1 : comment.voteScore - 1
    }
}

export default comments