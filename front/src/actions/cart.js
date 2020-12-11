import axios from 'axios';

const addCart = function(cart) {
    return {
        type: "ADD_CART",
        cart,
    };
};

const addVirtualCart = function(virtualCart){
    return {
        type: "ADD_VIRTUAL_CART",
        virtualCart,
    };
};

const totalCart = function(total){
    return {
        type: "TOTAL_CART",
        total,
    };
};


export const userCart = function(product, user){
    console.log("userCart del action = ", user)
    return function(){
        return axios.post('http://localhost:1000/api/cart', {product, user});
    };
};

export const allCart = (userId) => {
    console.log('allCart Action = ', userId);
    return (dispatch) => {
        return axios.get(`http://localhost:1000/api/cart/${userId}`).then((res) => {
            console.log('res.data cartAction = ',res.data)
            dispatch(addCart(res.data.Products))
        })
    }
};

export const deleteProduct = function (product, user) {
    return function () {
      return axios.put("http://localhost:1000/api/cart/destroy", { product, user });
    };
};

export const addToVirtualCart = (product) => {
    if (!product) {
      product = {};
    }
    return (dispatch) => {
      return dispatch(addVirtualCart(product));
    };
  };

  export const quantityProduct = function (product, user, cant) {
    return function () {
      return axios.put("http://localhost:1000/api/cart/cant", { product, user, cant });
    };
  };

  export const clearCartInStore = () => (dispatch) => {
    return dispatch(addCart([]));
  };

  export const clearVirtualCartInStore = () => (dispatch) => {
    return dispatch(addVirtualCart([]));
  };


  export const fetchTotal = (tot) => {
    return function (dispatch) {
      return dispatch(totalCart(tot));
    };
  };