import React from 'react'
import Register from '../components/Register';
import {connect} from 'react-redux';
import {userRegister} from '../actions/users';
import axios from 'axios'


class RegisterContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };

        this.handleFirstname = this.handleFirstname.bind(this);
        this.handleLastname = this.handleLastname.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleFirstname(e){
        this.setState({firstName: e.target.value});
    }

    handleLastname(e){
        this.setState({lastName: e.target.value});
    }

    handleEmail(e){
        this.setState({email: e.target.value});
    }

    handlePassword(e){
        this.setState({password: e.target.value});
    }

    handleFacebookRegister() {
        axios.get("http://localhost:1000/api/auth/facebook");
      }

    handleSubmit(e){
        e.preventDefault();

        this.props.userRegister(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password,
        );
        
        console.log('Estas son las props del RegisterContainer = ',this.props)
        this.props.history.push("/login");
            
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });

    }

    render(){
        return(
            <Register
            handleFirstname={this.handleFirstname}
            handleLastname={this.handleLastname}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            handleSubmit={this.handleSubmit}
            handleFacebookRegister={this.handleFacebookRegister}
            />
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
      userRegister: (firstName, lastName, email, password) =>
        dispatch(userRegister(firstName, lastName, email, password)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(RegisterContainer);