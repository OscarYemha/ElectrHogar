const initialState = {
    cart : [],
    totalCart: [],
    orders: [],
    compras: [],
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CART":
            return Object.assign({}, state, {cart: action.cart});
        case "TOTAL_CART":
            return Object.assign({}, state, {totalCart: action.totalCart});
        case "ADD_ORDERS":
            return Object.assign({}, state, { orders: action.orders });
        case "MIS_COMPRAS":
            return Object.assign({}, state, { compras: action.compras });
        default:
            return state;
    }
};

export default cartReducer;