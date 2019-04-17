import * as PostApi from '../services/post'
import { showLoading, hideLoading } from 'react-redux-loading'
import * as CommentApi from '../services/comment'
import { addComment, deleteCommentByParent } from './comments';
import { history } from '../App';
import { ORDER_BY } from '../helpers/format';

export const RECEIVE_ALL_POST = 'RECEIVE_ALL_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT_POST = 'ADD_COMMENT_POST'
export const DELETE_COMMENT_POST = 'DELETE_COMMENT_POST'
export const SORT_POST = 'SORT_POST'

export const receiveAllPost = (posts) => {
    return {
        type: RECEIVE_ALL_POST,
        posts
    }
}
export const sortPost = (value) => {
    return {
        type: SORT_POST,
        value
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

export const addCommentInPost = (postId) => {
    return {
        type: ADD_COMMENT_POST,
        postId
    }
}

export const deleteCommentInPost = (postId) => {
    return {
        type: DELETE_COMMENT_POST,
        postId
    }
}

export const votePost = (postId, vote) => {
    return {
        type: VOTE_POST,
        postId,
        vote
    }
}

export const handleNewPost = (newPost, actioToRedirect) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.createPost(newPost)
        .then((post) => dispatch(addPost({...post, ...newPost})))
        .then(() => dispatch(hideLoading()))
        .then(() => actioToRedirect(newPost.category, newPost.id))
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
        .then((posts) => {
            dispatch(receiveAllPost(posts))
            dispatch(sortPost(ORDER_BY.date))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export const handleUpdatePost = (post, postId, actionToRedirect) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.updatePost(post, postId)
        .then((editPost) => {
            dispatch(updatePost(editPost))
            actionToRedirect(editPost.category, editPost.id)
            dispatch(hideLoading())
        })
    }
}

export const handleDeletePost = (postId) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return PostApi.deletePost(postId)
        .then(() => dispatch(deletePost(postId)))
        .then(()=> dispatch(deleteCommentByParent(postId)))
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