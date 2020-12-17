import React from 'react';
import Cart from '../components/Cart';
import {connect} from 'react-redux';
import {fetchTotal, addToVirtualCart, allCart, deleteProduct, quantityProduct} from '../actions/cart';
import FooterContainer from './FooterContainer'

class CartContainer extends React.Component {
    constructor(props){
        super(props);
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleQuantityProduct = this.handleQuantityProduct.bind(this);
        this.handleTotal = this.handleTotal.bind(this);
    }

    componentDidMount(){
        if (!this.props.user.id) {
            console.log("cartCont no user");
            let virtualCartVariable = JSON.parse(localStorage.getItem("cart"));
            return this.props.addToVirtualCart(virtualCartVariable);
          } else {
            console.log("cartCont user");
            return this.props.allCart(this.props.user.id);
          }
    }

    handleDelete(product){
      
            //Si hay usuario
            this.props.deleteProduct(product, this.props.user).then(() => {
              this.props.allCart(this.props.user.id);
            });
          
    }

    handleQuantityProduct(product, cant) {
        
          //Si hay Usuario
          this.props.quantityProduct(product, this.props.user, cant).then(() => {
            this.props.allCart(this.props.user.id);
          });      
        
      }

      handleTotal(total){
        return this.props.fetchTotal(total)
      }


    render(){
        return(
            <div>
                <Cart
                   virtualCart = {this.props.virtualCart}
                   handleQuantityProduct = {this.handleQuantityProduct}
                   handleDelete = {this.handleDelete}
                   user = {this.props.user}
                   cart = {this.props.cart}
                   handleTotal = {this.handleTotal}         
                />
                <FooterContainer/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("state del CartContainer = ",state)
    if(!state.cart.cart) {
        return {
            cart: [],
            user: state.user.user,
            virtualCart: state.cart.virtualCart,
        }
    }else {
        return {
            cart: state.cart.cart.sort((a, b) => (a.id > b.id ? 1 : -1)),
            user: state.user.user,
            virtualCart: state.cart.virtualCart,
        }
    }
}


export default connect(mapStateToProps, {deleteProduct, allCart, fetchTotal, addToVirtualCart, quantityProduct})(CartContainer)