import PostApi from '../services/post'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_ALL_POST = 'RECEIVE_ALL_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export const receiveAllPost = () => {
    return {
        type: RECEIVE_ALL_POST,
    }
}

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const votePost = (postId, vote) => {
    return {
        type: VOTE_POST,
        postId,
        vote
    }
}

export const handleNewPost = (newPost) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.createPost(newPost)
        .then((post) => dispatch(addPost(post)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleAllPosts = (newPost) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.getAllPost()
        .then((posts) => dispatch(receiveAllPost(posts)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleUpdatePost = (post) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.updatePost(post)
        .then((editPost) => dispatch(updatePost(editPost)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleDeletePost = (postId) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.deletePost(postId)
        .then(() => dispatch(deletePost(postId)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleVotePost = (postId, vote) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.votePost(postId, vote)
        .then(() => dispatch(votePost(postId, vote)))
        .then(() => dispatch(hideLoading()))
    }
}