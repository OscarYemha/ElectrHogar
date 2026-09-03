import axios from 'axios';
import API_URL from "../config/api";

axios.defaults.withCredentials = true;

const userRegister = (firstName, lastName, email, password) => {
    return () => {
        axios.post(`${API_URL}/api/register`, {
            firstName,
            lastName,
            email,
            password
        })
    }
}

const userLogger = (user) => {
    return{
        type:"USER_LOGIN",
        user
    }
}

const userLogin = (email, password) => dispatch => {
    return (
        axios.post(`${API_URL}/api/login`, {
            email,
            password
        })
    ).then(res => dispatch(userLogger(res.data)));
}

const userLogout = () => dispatch => {
    return(
        axios.post(`${API_URL}/api/logout`)
    ).then(()=> dispatch(userLogger({})));
}

const isLog = () => dispatch => {
    return axios.get(`${API_URL}/api/me`)
    .then((res) => {
        dispatch(userLogger(res.data))
    });
}

export {userLogin, userRegister, userLogout, isLog};