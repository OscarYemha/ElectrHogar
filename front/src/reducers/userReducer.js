const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'USER_LOGIN':
            return Object.assign({}, state, {user: action.user})
        default:
            return state;
    }
}

export default userReducer;