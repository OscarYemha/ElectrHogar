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

        console.log("props del componentDidMount del ProductsContainer = ", this.props)
        // let searchParams = new URLSearchParams(this.props.location.search.slice(1));
        // console.log("searchParams = ",searchParams);
        // let sear = searchParams.get("search");
        // let categ = searchParams.get("category");
        // if (!sear && !categ) {
        //     return this.props.fetchProducts();
        //   } else if (sear && !categ) {
        //     return this.props.fetchSingleProduct(sear);
        //   } else if (!sear && categ) {
        //     return this.props.fetchProductsWithCategory(sear, categ);
        //   } else if (sear && categ) {
        //     return this.props.fetchProductsWithCategory(sear, categ);
        //   }
        // this.props.fetchProducts();
    }

    handleCart(product) {
      
        //Si estoy logueado
        console.log("product del ProductsContainer handleCart = ", product);
        this.props.userCart(product, this.props.user).then(() => {
          console.log("this props all cart");
          this.props.allCart(this.props.user.id);
        });
      
    }
    
    render(){
      let filteredProducts = this.props.products &&this.props.products.filter(product => 
         product.name.toLowerCase().includes(this.props.productName))
      // console.log('filteredProducts = ',filteredProducts);
      console.log("props.categoryArray = ",this.props.categoryArray)
        return(
            <div>

              <Jumbotron/>
              {this.props.categoryArray.length>0 ? <Products
            handleCart={this.handleCart}
            productsArray={this.props.categoryArray}
            user = {this.props.user}
            /> :  <Products
            handleCart={this.handleCart}
            productsArray={filteredProducts.length>0 ? filteredProducts : this.props.products}
            user = {this.props.user}
            />}
           
            <FooterContainer/>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log("state del ProductsContainer = ",state)
    console.log("ownProps del ProductsContainer = ",ownProps.match.params.name)
    const categoryName = ownProps.match.params.name;
    return {
      products: state.products.products,
      singleProduct: state.singleProduct.singleProduct,
      user: state.user.user,
      productName: state.products.productName,
      categoryArray: state.products.products.filter(product => product.Categories[0].name.includes(categoryName))
        
    };
  };


export default connect(mapStateToProps, {
    fetchProducts, fetchSingleProduct,fetchProductsWithCategory, userCart, allCart, addToVirtualCart
})(ProductsContainer);