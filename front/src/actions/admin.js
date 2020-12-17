import axios from 'axios';


const receiveAdminProducts = function(allproducts){
    return {
        type: 'RECEIVE_ADMIN_PRODUCTS',
        allproducts,
    };
};

const receiveAdminCategories = function(allcategories){
    return {
        type: "RECEIVE_ADMIN_CATEGORIES",
        allcategories,
    };
};

const receiveAllUsers = function(allusers){
    return{
        type: "RECEIVE_ALL_USERS",
        allusers,
    }
}


export const fetchAllUsers = () => (dispatch) =>
  axios
    .get("http://localhost:1000/api/admin/users")
    .then((res) => res.data)
    .then((allusers) => dispatch(receiveAllUsers(allusers)));

export const fetchAdminProducts = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/admin/products')
    .then((res) => res.data)
    .then((allproducts) => {console.log("esto es el fetchAdminProducts = ", allproducts) 
    dispatch(receiveAdminProducts(allproducts))});

export const fetchAdminCategories = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/admin/categories')
    .then((res) => res.data)
    .then((allcategories) => dispatch(receiveAdminCategories(allcategories)));


    export const userRol = function (user, rol) {
        return function () {
          return axios.put(`http://localhost:1000/api/admin/users/rol`, {user, rol});
        };
        };


        export const deleteUser = function (user) {
            return function () {
              return axios.put("http://localhost:1000/api/admin/users/destroy", {user});
            };
            };


export const createAdminProduct = function(product, category) {
    return function() {
        return axios.post(`http://localhost:1000/api/admin/newproduct`, {product, category});
    };
};

export const editAdminProduct = function (product) {
    console.log('editProduct del actionAdmin = ', product)
    return function(){
        return axios.put(`http://localhost:1000/api/admin/products/${product.id}`,{product});
    };
};

export const deleteAdminProduct = function (product) {
    return function(){
        return axios.put(`http://localhost:1000/api/admin/products/destroy`, {product});
    };
};

export const createAdminCategory = function(category){
    return function(){
        return axios.post(`http://localhost:1000/api/admin/newcategory`, {category});
    };
};

export const deleteAdminCategory = function(category){
    return function(){
        return axios.put(`http://localhost:1000/api/admin/category/destroy`, {category});
    };
};