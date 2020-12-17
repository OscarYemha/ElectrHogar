import React from 'react';
import SingleProduct from '../components/SingleProduct';
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../actions/singleProduct';
import {userCart, allCart, addToVirtualCart} from '../actions/cart'

class SingleProductContainer extends React.Component{
    constructor(props){
        super(props);
        console.log('props del singleProductContainer', this.props)

        this.handleCart = this.handleCart.bind(this);
    }

    componentDidMount(){
        console.log('componentDIdMount del singleProductContainer')
        this.props.fetchSingleProduct(this.props.match.params.id);
    }

    handleCart(product) {
        console.log("product SingleProductContainer handleCart = ", product)
        this.props.userCart(this.props.singleProduct, this.props.user)
        .then(() => {
          this.props.allCart(this.props.user.id);
        });
      }

    render(){
        console.log('Esto es props.singleProduct = ',this.props.singleProduct)
        return(
            <div>
                <SingleProduct
                singleProduct={this.props.singleProduct}
                handleCart={this.handleCart}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('state del singleProductContainer',state)
    return {
      singleProduct: state.singleProduct.singleProduct,
      user: state.user.user,
    };
  };

  const mapDispatchToProps = (dispatch) =>{
      return{
          fetchSingleProduct: (id)=> dispatch(fetchSingleProduct(id)),
          userCart : (singleProduct, user)=> dispatch(userCart(singleProduct, user)),
          allCart: (user) => dispatch(allCart(user)),
          addToVirtualCart: () => dispatch(addToVirtualCart())
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer);
  