import CategoryApi from '../services/category'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveAllPost } from './post';

export const RECEIVE_ALL_CATEGORY = 'RECEIVE_ALL_CATEGORY'

export const receiveAllCategories = () => {
    return {
        type: RECEIVE_ALL_CATEGORY,
    }
}

export const handleAllCategories = () => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CategoryApi.getAllCategories()
        .then((categories) => dispatch(receiveAllCategories(categories)))
        .then(() => dispatch(hideLoading()))
    }
}

export const handleCategoriesByPost = (categoryId) => {
    return ( dispatch ) => {
        dispatch(showLoading())

        return CategoryApi.getCategory(categoryId)
        .then((posts) => dispatch(receiveAllPost(posts)))
        .then(() => dispatch(hideLoading()))
    }
}