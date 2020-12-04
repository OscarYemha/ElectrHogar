import axios from 'axios';
import {RECEIVE_CATEGORIES} from '../constants';


const receiveCategories = function(categories){
    return{
        type:RECEIVE_CATEGORIES,
        categories,
    };
};


export const fetchCategories = () => (dispatch) => {
    axios
    .get('http://localhost:1000/api/categories')
    .then((res) => {return res.data })
    .then((categories) => { dispatch(receiveCategories(categories))
    })
}