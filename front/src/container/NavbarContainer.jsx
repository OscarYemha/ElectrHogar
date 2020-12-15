import React from 'react'
import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import {userLogout} from '../actions/users';
import {clearProductInStore} from '../actions/singleProduct';
import {fetchProducts,fetchProductsName} from '../actions/products'
import {setSearchInStore} from '../actions/search';
import SearchContainer from '../container/SearchContainer';

class NavbarContainer extends React.Component{
    constructor(props){
        super(props);
      console.log("props de la NavbarContainer = ", props)
      this.state = {
        search : "",
      }

      this.handleLogout = this.handleLogout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout(e){
      console.log('e del handlelogout = ', e)
      console.log('props del handlelogout = ', this.props)
      this.props.userLogout()
    }

    handleChange(e){
      const event = (e.target.value).toLowerCase()
      this.setState({search: event})
    }

    handleSubmit(e){
      console.log("e del handleSubmit del NavbarContainer = ", e)
      console.log("state del handleSubmit del NavbarContainer =", this.state)
      console.log("props del handleSubmit del NavbarContainer =", this.props)
      e.preventDefault();
      this.props.fetchProductsName(this.state.search);
      this.props.setSearchInStore(this.state.search);
      this.props.history.push(`/search?=${this.state.search}`);
      this.setState({search: "",})
    }

    componentDidMount(){
      console.log('entre al did mount deel navbarcontainer')
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
            <SearchContainer 
            productName={this.props.productName}
            />
            </div>
        )
    }

}

const mapStateToProps = function (state) {
    return {
      products: state.products.products,
      user: state.user.user,
      productName: state.products.productName,
    };
  };


  
  export default connect(mapStateToProps, {
    fetchProducts,
    fetchProductsName,
    userLogout,
    clearProductInStore,
    setSearchInStore,
  })(NavbarContainer);