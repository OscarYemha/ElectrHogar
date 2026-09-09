import axios from 'axios';
import API_URL from "../config/api";

const addCart = function(cart) {
    return {
        type: "ADD_CART",
        cart,
    };
};

const addOrder = function (orders) {
  return {
    type: "ADD_ORDERS",
    orders,
  };
};

const totalCart = function(total){
    return {
        type: "TOTAL_CART",
        total,
    };
};

export const userCart = function(product){
    return function(){
      return axios.post(`${API_URL}/api/cart`, { product });
    };
};

export const allCart = () => {
    return (dispatch) => {
        return axios.get(`${API_URL}/api/cart`).then((res) => {
            dispatch(addCart(res.data.Products));
        });
    };
};

export const deleteProduct = function (product) {
    return function () {
      return axios.put(`${API_URL}/api/cart/destroy`, { product });
    };
};

export const quantityProduct = function (product, cant) {
  return function () {
    return axios.put(`${API_URL}/api/cart/cant`, { product, cant });
  };
};

export const clearCartInStore = () => (dispatch) => {
  return dispatch(addCart([]));
};

export const allOrders = () => {
  return (dispatch) => {
    return axios.get(`${API_URL}/api/orders`).then((res) => {
      dispatch(addOrder(res.data));
    });
  };
};

export const fetchTotal = (tot) => {
  return function (dispatch) {
    return dispatch(totalCart(tot));
  };
};