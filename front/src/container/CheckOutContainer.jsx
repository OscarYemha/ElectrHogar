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
            total: 0,
            isSubmitting: false,
            error: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.handleCard = this.handleCard.bind(this)
        this.handleCvv = this.handleCvv.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isSubmitting) {
            return;
        }

        const address = this.state.address.trim();
        const card = this.state.card.trim();
        const cvv = this.state.cvv.trim();

        if (!address) {
            this.setState({
                error: "Ingresá un domicilio válido."
            });
            return;
        }

        if (!/^\d{16}$/.test(card)) {
            this.setState({
                error: "La tarjeta debe contener exactamente 16 números."
            });
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            this.setState({
                error: "El CVV debe contener exactamente 3 números."
            });
            return;
        }

        this.setState({
            isSubmitting: true,
            error: ""
        });

        this.props.checkOutInfo(address)
            .then(() => {
                this.props.history.push('/confirmacion');
            })
            .catch((error) => {
                this.setState({
                    isSubmitting: false,
                    error:
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                            ? error.response.data.error
                            : "No se pudo completar la compra. Intentá nuevamente."
                });
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
                isSubmitting={this.state.isSubmitting}
                error={this.state.error}
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