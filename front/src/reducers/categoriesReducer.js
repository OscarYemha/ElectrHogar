import {RECEIVE_CATEGORIES} from '../constants';

const initialState = {
    categories: [],
}

const categoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return Object.assign({},state, {categories: action.categories});
        default:
            return state;
    }
}

export default categoriesReducer;