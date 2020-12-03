import React from 'react';
import {connect} from 'react-redux';
import AdminProducts from '../components/AdminProducts';
import {fetchAdminProducts} from '../actions/admin';

class AdminProductsContainer extends React.Component {
    constructor(props){
        super(props);
        console.log('props del AdminProductsContainer = ', this.props)
    }

    componentDidMount() {
        console.log('componentDidMount del AdminProductsContainer')
        this.props.fetchAdminProducts()
    }

    render(){
        console.log('Esto es props.allproducts = ', this.props.allproducts)
        return(
            <AdminProducts 
            allproducts = {this.props.allproducts}
            />
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state del AdminProductContainer', state)
    return{
        allproducts: state.admin.allproducts,
    }
}

export default connect(mapStateToProps, {fetchAdminProducts})(AdminProductsContainer);