import React from 'react';
import Cart from '../components/Cart';
import {connect} from 'react-redux';
import {fetchTotal, allCart, deleteProduct, quantityProduct} from '../actions/cart';
import FooterContainer from './FooterContainer'

class CartContainer extends React.Component {
    constructor(props){
        super(props);
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleQuantityProduct = this.handleQuantityProduct.bind(this);
        this.handleTotal = this.handleTotal.bind(this);
    }

    componentDidMount(){
        if (this.props.user.id) {
            this.props.allCart();
        }
    }

    componentDidUpdate(prevProps){
        if (!prevProps.user.id && this.props.user.id) {
            this.props.allCart();
        }
    }

    handleDelete(product){
        this.props.deleteProduct(product).then(() => {
        this.props.allCart();
        });
    }

    handleQuantityProduct(product, cant) {
        this.props.quantityProduct(product, cant).then(() => {
        this.props.allCart();
        });
    }

    handleTotal(total){
    return this.props.fetchTotal(total)
    }


    render(){
        return(
            <div>
                <Cart
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
    if(!state.cart.cart) {
        return {
            cart: [],
            user: state.user.user,
        }
    }else {
        return {
            cart: state.cart.cart.sort((a, b) => (a.id > b.id ? 1 : -1)),
            user: state.user.user,
        }
    }
}


export default connect(mapStateToProps, {deleteProduct, allCart, fetchTotal, quantityProduct})(CartContainer)