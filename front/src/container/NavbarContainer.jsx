import React from 'react'
import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import {userLogout} from '../actions/users';

class NavbarContainer extends React.Component{
    constructor(props){
        super(props);

      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
      console.log('e del handlelogout = ', e)
      console.log('props del handlelogout = ', this.props)
      this.props.userLogout()
    }

    render(){
        return(
            <Navbar
            handleLogout={this.handleLogout}
            user={this.props.user}
            />
        )
    }

}

const mapStateToProps = function (state) {
    return {
      products: state.products.products,
      user: state.user.user,
    };
  };
  
  export default connect(mapStateToProps, {
    // fetchProducts,
    userLogout,
    // clearCartInStore,
    // clearProductInStore,
    // setSearchInStore,
  })(NavbarContainer);