import * as CategoryApi from '../services/category'
import { receiveAllPost } from './post';

export const RECEIVE_ALL_CATEGORY = 'RECEIVE_ALL_CATEGORY'

export const receiveAllCategories = (categories) => {
    return {
        type: RECEIVE_ALL_CATEGORY,
        categories: categories.categories
    }
}

export const handleAllCategories = () => {
    return ( dispatch ) => {

        return CategoryApi.getAllCategories()
        .then((categories) => dispatch(receiveAllCategories(categories)))
    }
}

export const handleCategoriesByPost = (categoryId) => {
    return ( dispatch ) => {

        return CategoryApi.getCategory(categoryId)
        .then((posts) => dispatch(receiveAllPost(posts)))
    }
}