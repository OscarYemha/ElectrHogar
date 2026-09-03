import axios from 'axios';
import {RECEIVE_CATEGORIES} from '../constants';
import API_URL from "../config/api";

const receiveCategories = function(categories){
    return{
        type:RECEIVE_CATEGORIES,
        categories,
    };
};


export const fetchCategories = () => (dispatch) => {
    axios
    .get(`${API_URL}/api/categories`)
    .then((res) => {return res.data })
    .then((categories) => { dispatch(receiveCategories(categories))
    })
}