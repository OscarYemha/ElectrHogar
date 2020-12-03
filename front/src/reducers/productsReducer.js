import {RECEIVE_PRODUCTS} from '../constants';

const initialState = {
    products: [],
}

export default (state = initialState, action) => {
    console.log("este es el action.products = ",action.products)
    switch(action.type){
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {products: action.products});
        default:
            return state;
    }
};