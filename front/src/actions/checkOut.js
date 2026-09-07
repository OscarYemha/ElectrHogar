import axios from "axios";
import API_URL from "../config/api";

export const checkOutInfo = function (address) {
  return function () {
    return axios.put(`${API_URL}/api/checkout`, {
      address,
    });
  };
};
