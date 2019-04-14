import * as CommentApi from '../services/comment'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addCommentInPost, deleteCommentInPost } from './post';

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT_BY_PARENT = 'DELETE_COMMENT_BY_PARENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const OPEN_DIALOG_COMMENT = 'OPEN_COMMENT'
export const CLOSE_DIALOG_COMMENT = 'CLOSE_COMMENT'

export const closeDialogComment = () => {
    return {
        type: CLOSE_DIALOG_COMMENT
    }
}

export const openDialogComment = () => {
    return {
        type: OPEN_DIALOG_COMMENT
    }
}

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

export const deleteCommentByParent = (parentId) => {
    return {
        type: DELETE_COMMENT_BY_PARENT,
        parentId
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

export const handleNewComment = (newComment, post) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.createComment(newComment)
        .then((comments) => {
            dispatch(addComment({...newComment, ...comments}))
            dispatch(addCommentInPost(post))
            dispatch(closeDialogComment())
        })
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

export const handleDeleteComment = (comment) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CommentApi.deleteComment(comment.id)
        .then(() => dispatch(deleteComment(comment.id)))
        .then(() => dispatch(deleteCommentInPost(comment.parentId)))
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