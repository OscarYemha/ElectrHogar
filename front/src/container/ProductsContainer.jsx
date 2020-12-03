import React from 'react';
import Products from '../components/Products';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products';
import NavbarContainer from './NavbarContainer';
import FooterContainer from './FooterContainer';

class ProductsContainer extends React.Component{

    constructor(props){  
        super(props);
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    render(){
        return(
            <div>
            <Products
            productsArray={this.props.products}
            />
            <FooterContainer/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
      products: state.products.products,
    };
  };

export default connect(mapStateToProps, {
    fetchProducts,
})(ProductsContainer);