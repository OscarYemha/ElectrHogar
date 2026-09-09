import React from 'react';
import Products from '../components/Products';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products'
import {fetchSingleProduct, fetchProductsWithCategory} from '../actions/singleProduct';
import { userCart, allCart } from "../actions/cart";
import FooterContainer from './FooterContainer';
import Jumbotron from '../components/Jumbotron';
import Snackbar from '@material-ui/core/Snackbar';

class ProductsContainer extends React.Component{

    constructor(props){  
        super(props);
        this.state = {
          search: '',
          cartMessageOpen: false,
        }
        
        this.handleCart = this.handleCart.bind(this);
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    handleCart(product) {
      this.props.userCart(product).then(() => {
        this.props.allCart();
        this.setState({
          cartMessageOpen: true,
        });
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
              ) : this.props.productName && filteredProducts.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "30px" }}>
                  No se encontraron productos.
                </p>
              ) : (
                <Products
                  handleCart={this.handleCart}
                  productsArray={
                    this.props.productName
                      ? filteredProducts
                      : this.props.products
                  }
                  user={this.props.user}
                />
              )}
              <Snackbar
                open={this.state.cartMessageOpen}
                autoHideDuration={2500}
                onClose={() => {
                  this.setState({
                    cartMessageOpen: false,
                  });
                }}
                ContentProps={{
                  style: {
                    justifyContent: "center",
                  },
                }}
                message={
                  <span
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Producto agregado al carrito
                  </span>
                }
              />
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
    fetchProducts, fetchSingleProduct,fetchProductsWithCategory, userCart, allCart
})(ProductsContainer);