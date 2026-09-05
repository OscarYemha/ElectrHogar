import axios from 'axios';
import {RECEIVE_SINGLE_PRODUCT, RECEIVE_PRODUCTS} from '../constants';
import API_URL from "../config/api";

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
  axios
    .get(`${API_URL}/api/singleproduct/${id}`)
    .then((res) => res.data)
    .then((singleProduct) =>
      dispatch(receiveSingleProduct(singleProduct))
    );


export const clearProductInStore = () => (dispatch) => {
    return dispatch(receiveProducts([]));
};


export const fetchProductsWithCategory = (searchString, category) => (dispatch) => {
    if(searchString && category){
        axios
        .get(`${API_URL}/api/products?${searchString}&category=${category}`)
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
        .get(`${API_URL}/api/products?category=${category}`)
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