import axios from 'axios';
import {RECEIVE_SINGLE_PRODUCT, RECEIVE_PRODUCTS} from '../constants';


const receiveProducts = function (products) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
    }
};

const receiveSingleProduct = function (singleProduct) {
    return {
        type: RECEIVE_SINGLE_PRODUCT,
        singleProduct,
    }
};


export const fetchProducts = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/products')
    .then((res) => res.data)
    .then((products) => { console.log("estos son los products= ",products)
        dispatch(receiveProducts(products))});
        

export const fetchSingleProduct = (id) => (dispatch) =>

    {console.log('Llegó al action')
     return axios
    .get(`http://localhost:1000/api/singleproduct/${id}`)
    .then((res) => res.data)
    .then((singleProduct) => { console.log("esto es el singleProduct = ", singleProduct)
        dispatch(receiveSingleProduct(singleProduct))});}