import {RECEIVE_PRODUCTS, FETCH_PRODUCTS} from '../constants';

const initialState = {
    products: [],
    productName: '',
}

export default (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {products: action.products});
        case FETCH_PRODUCTS:
            return Object.assign({},state, {productName: action.data})
        default:
            return state;
    }
};