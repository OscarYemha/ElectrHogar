const initialState = {
    allproducts:{},
    allcategories:{},
    allusers:{}
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'RECEIVE_ADMIN_PRODUCTS':
            return Object.assign({}, state, {allproducts: action.allproducts});
        case 'RECEIVE_ADMIN_CATEGORIES':
            return Object.assign({},state,{allcategories: action.allcategories});
        case "RECEIVE_ALL_USERS":
            return Object.assign({},state,{allusers:action.allusers});
        default:
            return state;
    }
}