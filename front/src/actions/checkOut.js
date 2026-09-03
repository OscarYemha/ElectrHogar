import axios from "axios";
import API_URL from "../config/api";

export const checkOutInfo = function (address, card, cvv, user, total) {
  return function () {
    return axios.put(`${API_URL}/api/checkout`, { address, card, cvv, user, total });
  };
};