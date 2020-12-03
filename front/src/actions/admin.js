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


export const fetchAdminProducts = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/admin/products')
    .then((res) => res.data)
    .then((allproducts) => {console.log("esto es el fetchAdminProducts = ", allproducts) 
    dispatch(receiveAdminProducts(allproducts))});

export const fetchAdminCategories = () => (dispatch) =>
    axios
    .get('http://localhost:1000/api/admin/category')
    .then((res) => res.data)
    .then((allcategories) => dispatch(receiveAdminCategories(allcategories)));


export const addAdminProduct = function(product, category) {
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

export const addAdminCategory = function(category){
    return function(){
        return axios.post(`http://localhost:1000/api/admin/newcategory`);
    };
};

export const deleteAdminCategory = function(category){
    return function(){
        return axios.put(`http://localhost:1000/api/admin/category/destroy`);
    };
};