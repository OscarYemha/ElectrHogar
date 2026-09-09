import {RECEIVE_PRODUCTS,RECEIVE_SINGLE_PRODUCT} from '../constants';

const initialState = {
  products: [],
  singleProduct: {},
};

const singleProductReducer = (state = initialState, action) => {

  switch (action.type) {
    case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {products: action.products});
    case RECEIVE_SINGLE_PRODUCT:
      return Object.assign({}, state, { singleProduct: action.singleProduct});
    default:
      return state;
  }
};

export default singleProductReducer;