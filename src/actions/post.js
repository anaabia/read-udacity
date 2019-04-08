import * as PostApi from '../services/post'
import { showLoading, hideLoading } from 'react-redux-loading'
import * as CommentApi from '../services/comment'
import { addComment } from './comments';

export const RECEIVE_ALL_POST = 'RECEIVE_ALL_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export const receiveAllPost = (posts) => {
    return {
        type: RECEIVE_ALL_POST,
        posts
    }
}

export const addPost = (posts) => {
    return {
        type: ADD_POST,
        posts
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

export const handlePost = (postId) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return Promise.all([
            PostApi.getPost(postId),
            CommentApi.getAllComment(postId)])
        .then(([post, comments]) => {
            dispatch(addPost(post))
            dispatch(addComment(comments))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export const handleAllPosts = () => {
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
        .then((vote) => console.log(vote))
        .then(() => dispatch(votePost(postId, vote)))
        .then(() => dispatch(hideLoading()))
    }
}