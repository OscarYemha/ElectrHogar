import {ADD_CART} from '../constants';

const initialState = {
    cart : [],
    totalCart: [],
    virtualCart: [],
}

export default (state = initialState, action) => {
    switch(action.type){
        case "ADD_CART":
            return Object.assign({}, state, {cart: action.cart});
        case "TOTAL_CART":
            return Object.assign({}, state, {totalCart: action.totalCart});
        case "ADD_VIRTUAL_CART":
            return Object.assign({}, state, {virtualCart: action.virtualCart});
        default:
            return state;
    }
};