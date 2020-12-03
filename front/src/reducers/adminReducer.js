const initialState = {
    allproducts:{},
    allcategories:{},
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'RECEIVE_ADMIN_PRODUCTS':
            return Object.assign({}, state, {allproducts: action.allproducts});
        case 'RECEIVE_ADMIN_CATEGORIES':
            return Object.assign({},state,{allcategories: action.allcategories});
        default:
            return state;
    }
}