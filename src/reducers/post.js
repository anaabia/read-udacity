import { mapKeys } from 'lodash'
import {
    RECEIVE_ALL_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST,
    ADD_COMMENT_POST,
    DELETE_COMMENT_POST
} from '../actions/post'
import { UP_VOTE } from '../constants/util'

const posts = (state = {}, action) => {
    const { posts } = action;
    switch (action.type) {
        case ADD_POST:
            return {
                ...state, [posts.id]: posts
            }
        case RECEIVE_ALL_POST:
            return mapKeys(posts, (value, key) => value.id)
        case UPDATE_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    ...action.post
                }
            }
        case DELETE_POST:
            return {
                ...state,
                ...deletePost(state, action.postId)
            }
        case VOTE_POST:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: action.vote === UP_VOTE ? state[action.postId].voteScore + 1 : state[action.postId].voteScore - 1
                }
            }
        case ADD_COMMENT_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    commentCount: state[action.post.id].commentCount + 1
                }
            }
        case DELETE_COMMENT_POST:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    commentCount: state[action.postId].commentCount - 1
                }
            }

        default:
            return state;
    }
}

const deletePost = (posts, id) => {
    delete posts[id]
    return posts
}
export default posts