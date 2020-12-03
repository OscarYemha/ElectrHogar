import axios from 'axios';
import {RECEIVE_PRODUCTS} from '../constants';


const receiveProducts = function (products) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
    }
};



export const fetchProducts = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/products')
    .then((res) => res.data)
    .then((products) => { console.log("estos son los products= ",products)
        dispatch(receiveProducts(products))});

