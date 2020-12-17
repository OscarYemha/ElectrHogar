import axios from "axios";

// const receiveCardInfo = function (allProducts) {
//   return {
//     type: CHECKOUT_CART,
//     CardInfo,
//   };
// };


export const checkOutInfo = function (address, card, cvv, user, total) {
  return function () {
    return axios.put("http://localhost:1000/api/checkout", { address, card, cvv, user, total });
  };
};