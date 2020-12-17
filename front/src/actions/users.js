import axios from 'axios';
axios.defaults.withCredentials = true;


const userRegister = (firstName, lastName, email, password) => {
    return () => {
        axios.post("http://localhost:1000/api/register", {
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
        axios.post("http://localhost:1000/api/login", {
            email,
            password
        })
    ).then(res => dispatch(userLogger(res.data)));
}

const userLogout = () => dispatch => {
    return(
        axios.post("http://localhost:1000/api/logout")
    ).then(()=> dispatch(userLogger({})));
}

const isLog = () => dispatch => {
    return axios.get("http://localhost:1000/api/me")
    .then((res) => {
        dispatch(userLogger(res.data))
    });
}

export {userLogin, userRegister, userLogout, isLog};