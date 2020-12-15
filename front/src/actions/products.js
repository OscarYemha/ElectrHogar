import axios from 'axios';
import {RECEIVE_PRODUCTS, FETCH_PRODUCTS} from '../constants';


const receiveProducts = function (products) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
    }
};



export const fetchProducts = () => (dispatch) =>
    axios
    .get(`http://localhost:1000/api/products`)
    .then((res) => res.data)
    .then((products) =>  
        dispatch(receiveProducts(products)));


        export const fetchProductsName = function (data) {
            return {
                type: FETCH_PRODUCTS,
                data,
            }
        };