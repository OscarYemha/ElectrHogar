import React from 'react';
import SingleProduct from '../components/SingleProduct';
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../actions/singleProduct';
import {userCart, allCart} from '../actions/cart'
import Snackbar from '@material-ui/core/Snackbar';

class SingleProductContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cartMessageOpen: false,
        };
        this.handleCart = this.handleCart.bind(this);
    }

    componentDidMount(){
        this.props.fetchSingleProduct(this.props.match.params.id);
    }

    handleCart(product) {
        this.props.userCart(
            this.props.singleProduct
        ).then(() => {
            this.props.allCart();

            this.setState({
                cartMessageOpen: true,
            });
        });
    }

    render(){
        return(
            <div>
                <SingleProduct
                user = {this.props.user}
                singleProduct={this.props.singleProduct}
                handleCart={this.handleCart}
                />
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
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      singleProduct: state.singleProduct.singleProduct,
      user: state.user.user,
    };
  };

  const mapDispatchToProps = (dispatch) =>{
      return{
          fetchSingleProduct: (id)=> dispatch(fetchSingleProduct(id)),
          userCart : (singleProduct)=> dispatch(userCart(singleProduct)),
          allCart: () => dispatch(allCart())
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer);
  