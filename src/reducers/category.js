import { RECEIVE_ALL_CATEGORY } from '../actions/category'

const categories = (states = [], action) => {
    switch(action.type){
        case RECEIVE_ALL_CATEGORY:
        return  action.categories
        default :
        return states;
    }
}

export default categories