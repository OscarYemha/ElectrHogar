import React from "react";
import Login from "../components/Login";
import { connect } from "react-redux";
import { userLogin } from "../actions/users";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" });

    this.props.userLogin(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({
          error: "Email o contraseña incorrectos.",
        });
      });
  }

  render() {
    return (
      <Login
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleSubmit={this.handleSubmit}
        error={this.state.error}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {
  userLogin,
})(LoginContainer);
