import React from 'react';
import {connect} from 'react-redux';
import AdminProducts from '../components/AdminProducts';
import {fetchAdminProducts, deleteAdminProduct} from '../actions/admin';

class AdminProductsContainer extends React.Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.fetchAdminProducts()
    }

    handleDelete(product){
        this.props.deleteAdminProduct(product).then(()=>{
            this.props.fetchAdminProducts();
        })
    }

    render(){
        return(
            <AdminProducts 
            allproducts = {this.props.allproducts}
            handleDelete = {this.handleDelete}
            user = {this.props.user}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allproducts: state.admin.allproducts,
        user: state.user.user,
    }
}

export default connect(mapStateToProps, {fetchAdminProducts, deleteAdminProduct})(AdminProductsContainer);