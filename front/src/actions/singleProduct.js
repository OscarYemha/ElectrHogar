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




export const fetchSingleProduct = (id) => (dispatch) =>

    {console.log('Llegó al action')
     return axios
    .get(`http://localhost:1000/api/singleproduct/${id}`)
    .then((res) => res.data)
    .then((singleProduct) => { console.log("esto es el singleProduct = ", singleProduct)
        dispatch(receiveSingleProduct(singleProduct))});}


export const clearProductInStore = () => (dispatch) => {
    return dispatch(receiveProducts([]));
};


export const fetchProductsWithCategory = (searchString, category) => (dispatch) => {
    if(searchString && category){
        axios
        .get(`http://localhost:1000/api/products?${searchString}&category=${category}`)
        .then((res) => {
            return res.data;
        })
        .then((products) => {
            if(products.length === 0){
                dispatch(receiveProducts(["NA"]));
            }else {
                dispatch(receiveProducts(products));
            }
        });
    }else if(!searchString && category){
        axios
        .get(`http://localhost:1000/api/products?category=${category}`)
        .then((res) => {
            return res.data;
        })
        .then((products) => {
            if(products.length === 0) {
                dispatch(receiveProducts["NA"]);
            }else {
                dispatch(receiveProducts(products));
            }
        })
    }
}