import React from 'react';
import SingleCategory from '../components/Categories';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/products'
import Categories from '../components/Categories';


class SingleCategoryContainer extends React.Component{
    constructor(props){
        super(props);
        console.log('props del singleCategoryContainer', this.props.products[0].Categories)
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    render(){
        // let filteredProducts = this.props.products &&this.props.products.filter((category) => 
        //     category.includes(this.props.products))
        //  console.log('filteredProductsCategoryContainer = ',filteredProducts);
        return(
            <div>
                <SingleCategory
                productsArray={this.props.products}
                // productsArray={filteredProducts.length>0 ? filteredProducts : this.props.products}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state del singleCategoryContainer',state)
    return {
      products: state.products.products,
      user: state.user.user
    };
  };



export default connect(mapStateToProps, fetchProducts)(SingleCategoryContainer);