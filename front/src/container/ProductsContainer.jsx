import React from 'react';
import Products from '../components/Products';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products'
import {fetchSingleProduct, fetchProductsWithCategory} from '../actions/singleProduct';
import { userCart, allCart, addToVirtualCart } from "../actions/cart";
import FooterContainer from './FooterContainer';
import Jumbotron from '../components/Jumbotron';

class ProductsContainer extends React.Component{

    constructor(props){  
        super(props);
        console.log("props del ProductContainer = ", props)
        this.state = {
          search: '',
        }
        
        this.handleCart = this.handleCart.bind(this);
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    handleCart(product) {
        this.props.userCart(product, this.props.user).then(() => {
          this.props.allCart(this.props.user.id);
        });
      
    }
    
    render(){
      let filteredProducts = this.props.products &&this.props.products.filter(product => 
         product.name.toLowerCase().includes(this.props.productName))
        return(
            <div>

              <Jumbotron/>
              {this.props.categoryName ? (
                this.props.categoryArray.length > 0 ? (
                  <Products
                    handleCart={this.handleCart}
                    productsArray={this.props.categoryArray}
                    user={this.props.user}
                  />
                ) : (
                  <p style={{ textAlign: "center", marginTop: "30px" }}>
                    No hay productos en esta categoría.
                  </p>
                )
              ) : (
                <Products
                  handleCart={this.handleCart}
                  productsArray={filteredProducts.length > 0 ? filteredProducts : this.props.products}
                  user={this.props.user}
                />
              )}
            <FooterContainer/>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const categoryName = ownProps.match.params.name;
    return {
      products: state.products.products,
      singleProduct: state.singleProduct.singleProduct,
      user: state.user.user,
      productName: state.products.productName,
      categoryName: categoryName,
      categoryArray: state.products.products.filter(
        product =>
          product.Categories &&
          product.Categories.length > 0 &&
          product.Categories[0].name.includes(categoryName)
      )      
    };
  };


export default connect(mapStateToProps, {
    fetchProducts, fetchSingleProduct,fetchProductsWithCategory, userCart, allCart, addToVirtualCart
})(ProductsContainer);