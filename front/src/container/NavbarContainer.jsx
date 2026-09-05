import React from 'react';
import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import {userLogout} from '../actions/users';
import {clearProductInStore} from '../actions/singleProduct';
import {fetchProducts,fetchProductsName} from '../actions/products';
import {setSearchInStore} from '../actions/search';

class NavbarContainer extends React.Component{
    constructor(props){
        super(props);
      this.state = {
        search : "",
      }

      this.handleLogout = this.handleLogout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout(e){
      this.props.userLogout()
    }

    handleChange(e){
      const event = (e.target.value).toLowerCase()
      this.setState({search: event})
    }

    handleSubmit(e){
      e.preventDefault();
      this.props.fetchProductsName(this.state.search);
      this.props.setSearchInStore(this.state.search);
      this.props.history.push(`/products?search=${this.state.search}`);
      this.setState({search: "",})
    }

    componentDidMount(){
      this.props.fetchProducts();
    }


    render(){

      // const filteredProducts = this.state.products.filter(product =>{
      //   return product.name.toLowerCase().includes(this.state.search.toLowerCase())
      // })

        return(
          <div>
            <Navbar
            handleLogout={this.handleLogout}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            search = {this.state.search}
            clearProductInStore = {this.props.clearProductInStore}
            user={this.props.user}
            />
           
            
            </div>
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
    fetchProducts,
    fetchProductsName,
    userLogout,
    clearProductInStore,
    setSearchInStore,
  })(NavbarContainer);