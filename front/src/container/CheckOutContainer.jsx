import React from 'react'
import CheckOut from '../components/CheckOut'
import { connect } from 'react-redux'
import {checkOutInfo} from '../actions/checkOut' 


class CheckOutContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: "",
            card: "",
            cvv: "",
            total: 0

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.handleCard = this.handleCard.bind(this)
        this.handleCvv = this.handleCvv.bind(this)
       
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.checkOutInfo(
            this.state.address,
            this.state.card,
            this.state.cvv,
            this.props.user,
            this.props.total
        ).then(() => {
            this.props.history.push('/confirmacion');
        }); 
      }

    handleAddress(e) {
        this.setState({address: e.target.value})

    }

    handleCard(e) {
        this.setState({card: e.target.value})
    }

    handleCvv(e) {
        this.setState({cvv: e.target.value})
    }

    render() {
        return (
            <div>
                <CheckOut 
                handleSubmit = {this.handleSubmit} 
                handleAddress = {this.handleAddress} 
                handleCard = {this.handleCard} 
                handleCvv = {this.handleCvv}
                user={this.props.user}
                total={this.props.total}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      total: state.cart.totalCart
    };
  };

export default connect(mapStateToProps, {checkOutInfo})(CheckOutContainer)