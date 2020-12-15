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
      if (!this.props.user.id) {
        //Si no estoy logueado
        if (localStorage.length === 0) {
          //Si no hay producto crea un nuevo elemento en el localstorage
          let newArrayVirtualCart = [];
          let newProduct = product;
          newProduct.CartProductQuantity = { quantity: 1 };
          newArrayVirtualCart.push(newProduct);
          localStorage.setItem("cart", JSON.stringify(newArrayVirtualCart));
        } else {
          //Si hay productos buscar y sumar, sino agregar uno nuevo
          let arrayVirtualCart = JSON.parse(localStorage.getItem("cart"));
          let flag = false;
          let indice = "";
          arrayVirtualCart.map((elem, index) => {
            if (elem.id === product.id) {
              flag = true;
              indice = index;
            }
          });
          if (flag === true) {
            arrayVirtualCart[indice].CartProductQuantity.quantity =
              arrayVirtualCart[indice].CartProductQuantity.quantity + 1;
            localStorage.setItem("cart", JSON.stringify(arrayVirtualCart));
          } else {
            let newProduct = product;
            newProduct.CartProductQuantity = { quantity: 1 };
            let addArrayVirtualCart = JSON.parse(localStorage.getItem("cart"));
            addArrayVirtualCart.push(newProduct);
            localStorage.setItem("cart", JSON.stringify(addArrayVirtualCart));
          }
        }
      } else {
        //Si estoy logueado
        console.log("product del ProductsContainer handleCart = ", product);
        this.props.userCart(product, this.props.user).then(() => {
          console.log("this props all cart");
          this.props.allCart(this.props.user.id);
        });
      }
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
            /> :  <Products
            handleCart={this.handleCart}
            productsArray={filteredProducts.length>0 ? filteredProducts : this.props.products}
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