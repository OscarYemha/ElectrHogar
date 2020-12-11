import {SET_SEARCH} from '../constants';

const setSearch = function(searchString){
    return{
        type: SET_SEARCH,
        searchString,
    };
};

export const setSearchInStore = (search) => (dispatch) => {
    return dispatch(setSearch(search));
}