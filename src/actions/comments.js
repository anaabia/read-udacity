import * as CommentApi from '../services/comment'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const voteComment = (commentId, vote) => {
    return {
        type: VOTE_COMMENT,
        commentId,
        vote
    }
}

export const handleNewComment = (newComment) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.createComment(newComment)
        .then((comment) => dispatch(addComment(comment)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleUpdateComment = (comment) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.updateComment(comment)
        .then((editComment) => dispatch(updateComment(editComment)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleDeleteComment = (commentId) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.deleteComment(commentId)
        .then(() => dispatch(deleteComment(commentId)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleVoteComment = (commentId, vote) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.voteComment(commentId, vote)
        .then(() => dispatch(voteComment(commentId, vote)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleCommentsByPost = (postId) => {
    return (dispatch) => {

        return CommentApi.getAllComment(postId)
        .then((comments) => dispatch(addComment(comments)))
    }
}