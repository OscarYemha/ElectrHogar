import React from 'react';
import {connect} from 'react-redux';
import AdminEditProduct from '../components/AdminEditProduct';
import {fetchSingleProduct} from '../actions/singleProduct';
import {editAdminProduct, fetchAdminProducts, fetchAdminCategories} from '../actions/admin';

class AdminEditProductContainer extends React.Component{
    constructor(props){
        console.log("props del EditProductContainer = ",props)
        super(props);

        this.state = {
            name: "",
            price: "",
            imgUrl: "",
            stock: "",
            description: "",
            category: [],
            id: ""
        }

        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handleStock = this.handleStock.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchAdminCategories();
        this.props.fetchSingleProduct(this.props.match.params.id).then(()=> this.setState({
            name: this.props.singleProduct.name,
            price: this.props.singleProduct.price,
            imgUrl: this.props.singleProduct.imgUrl,
            stock: this.props.singleProduct.stock,
            description: this.props.singleProduct.description

        }))
    }

    handleName(e){
        this.setState({name: e.target.value});
    }

    handlePrice(e){
        this.setState({price: e.target.value});
    }

    handleImg(e){
        this.setState({imgUrl: e.target.value});
    }

    handleStock(e){
        this.setState({stock: e.target.value});
    }

    handleDescription(e){
        this.setState({description: e.target.value});
    }

    handleCategory(e){
        let cat = this.state.category
        cat.push(e.id)
        this.setState({category: cat})
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.editAdminProduct({
            name: this.state.name,
            price: this.state.price,
            imgUrl: this.state.imgUrl,
            stock: this.state.stock,
            description: this.state.description,
            id: this.props.singleProduct.id,
        }).then(()=> this.props.fetchAdminProducts());

        this.props.history.push("/admin/products");

        this.setState({
            name: "",
            price: "",
            imgUrl: "",
            stock: "",
            description: "",
        });
    }

    render(){
        return(
            <AdminEditProduct 
            allcategories={this.props.allcategories}
            handleName = {this.handleName}
            handlePrice = {this.handlePrice}
            handleImg = {this.handleImg}
            handleStock = {this.handleStock}
            handleDescription = {this.handleDescription}
            handleCategory = {this.handleCategory}
            handleSubmit = {this.handleSubmit}
            category = {this.state.category}
            singleProduct = {this.props.singleProduct}
            state = {this.state}
            />
        )
    }

}


const mapStateToProps = (state) => {
    console.log("state del EditProductContainer = ", state)
    return{
        singleProduct: state.singleProduct.singleProduct,
        allcategories : state.admin.allcategories
    }
}


export default connect(mapStateToProps, {fetchSingleProduct, editAdminProduct, fetchAdminProducts, fetchAdminCategories})(AdminEditProductContainer)