const initialState = {
    cart : [],
    totalCart: [],
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CART":
            return Object.assign({}, state, {cart: action.cart});
        case "TOTAL_CART":
            return Object.assign({}, state, {totalCart: action.totalCart});
        default:
            return state;
    }
};

export default cartReducer;