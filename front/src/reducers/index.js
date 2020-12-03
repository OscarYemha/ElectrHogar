import {combineReducers} from 'redux';
import user from './userReducer';
import products from './productsReducer';
import singleProduct from './singleProductReducer';
import admin from './adminReducer';
import categories from './categoriesReducer';


export default combineReducers({
    user,
    products,
    singleProduct,
    admin,
    categories,
});