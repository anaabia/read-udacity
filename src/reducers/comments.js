import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT,
    OPEN_DIALOG_COMMENT,
    CLOSE_DIALOG_COMMENT,
    DELETE_COMMENT_BY_PARENT
} from '../actions/comments'
import { UP_VOTE } from '../constants/util'

const comment = (states = {comments: [], isShowDialog: false }, action) => {
    switch(action.type){
        case ADD_COMMENT:
            return  {
                ...states,
                comments: [...states.comments.concat(action.comment)]
            }
        case OPEN_DIALOG_COMMENT:
            return {
                ...states,
                isShowDialog: true
            }
        case CLOSE_DIALOG_COMMENT:
            return {
                ...states,
                isShowDialog: false
            }
        case UPDATE_COMMENT:
            return {
                ...states,
                comments: [...updateComment(states.comments, action)]
            }
        case DELETE_COMMENT:
            return {
                ...states,
                comments: [...states.comments.filter(comment => comment.id !== action.commentId)]
            }
        case VOTE_COMMENT:
            return {
                ...states,
                comments: [...states.comments.map(comment => comment.id === action.commentId ? handleVote(comment, action.vote) : comment )]
            }
        case DELETE_COMMENT_BY_PARENT:
            return {
                ...states,
                comments: [...states.comments.map(comment => comment.parentId === action.parentId ? deleteByParent(comment) :  comment)]
            }
        default :
        return states;
    }
}

const updateComment = (comments, action) => {
    const coment = comments.filter(comment => comment.id !== action.comment.id)
    return [
        ...coment.concat(action.comment),
    ]
}

const deleteByParent = (comment) => {
    return {
        ...comment,
        parentDeleted: true
    }
}
const handleVote = (comment, vote) => {
    return {
        ...comment,
        voteScore: vote === UP_VOTE ? comment.voteScore + 1 : comment.voteScore - 1
    }
}

export default comment