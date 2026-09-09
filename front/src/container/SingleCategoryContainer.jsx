import React from 'react';
import SingleCategory from '../components/Categories';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products'


class SingleCategoryContainer extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }

    render(){
        return(
            <div>
                <SingleCategory
                productsArray={this.props.products}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.products.products,
      user: state.user.user
    };
  };


export default connect(mapStateToProps, fetchProducts)(SingleCategoryContainer);