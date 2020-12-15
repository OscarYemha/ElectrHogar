import React from 'react';
import Search from '../components/Search';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products'
import {fetchSingleProduct, fetchProductsWithCategory} from '../actions/singleProduct';

class SearchContainer extends React.Component{
    constructor(props){  
        super(props);
        this.state = {
          search: '',
        }
    }
        componentDidMount(){
            this.props.fetchProducts();
    
            console.log("props del componentDidMount del SearchContainer = ", this.props)
        }   
    render(){
        let filteredProducts = this.props.products &&this.props.products.filter(product => 
            product.name.toLowerCase().includes(this.props.productName))
         console.log('filteredProducts = ',filteredProducts);
         return(
            <div>
            <Search
            handleCart={this.handleCart}
            productsArray={filteredProducts.length>0 ? filteredProducts : this.props.products}
            />
            
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    console.log("state del SearchContainer = ",state)
    return {
      products: state.products.products,
      singleProduct: state.singleProduct.singleProduct,
      user: state.user.user
    };
  };
  export default connect(mapStateToProps, {
    fetchProducts, fetchSingleProduct,fetchProductsWithCategory
})(SearchContainer);