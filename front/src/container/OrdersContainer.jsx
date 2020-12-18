import React, { Component } from "react";
import Orders from "../components/Orders";
import { connect } from "react-redux";
import {allOrders} from "../actions/cart";

class OrdersContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    return this.props.allOrders(this.props.user.id)
  }


  render() {
    return (
    <Orders orders={this.props.orders} />

    );
  }
}

const mapStateToProps = (state) => {
    console.log('USER', state.user)
    return {
        user: state.user.user,
        orders: state.cart.orders
    }

};

export default connect(mapStateToProps, {allOrders})(OrdersContainer);