import { RECEIVE_ALL_CATEGORY } from '../actions/category'

export default categories = (states = {}, action) => {
    switch(action.types){
        case RECEIVE_ALL_CATEGORY:
        return {
            ...states,
            ...action.categories
        }
        default :
        return states;
    }
}