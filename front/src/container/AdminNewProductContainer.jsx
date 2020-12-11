import React from 'react';
import AdminNewProduct from '../components/AdminNewProduct';
import {connect} from 'react-redux';
import {createAdminProduct, fetchAdminCategories} from '../actions/admin';

class AdminNewProductContainer extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            name: "",
            price: "",
            imgUrl: "",
            stock: "",
            description:"",
            category: [],
        }

        this.handleName = this.handleName.bind(this);
        this.handlePrice  = this.handlePrice.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handleStock = this.handleStock.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
    }

    componentDidMount(){
        return this.props.fetchAdminCategories();
    }

    handleName(e){
        this.setState({
            name: e.target.value
        });
    }

    handlePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    handleImg(e){
        this.setState({
            imgUrl: e.target.value
        });
    }

    handleStock(e){
        this.setState({
            stock: e.target.value
        });
    }

    handleDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    handleCategory(e){
        let cat = this.state.category
        cat.push(e.id)
        this.setState({category: cat})
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.createAdminProduct({
            name: this.state.name,
            price: this.state.price,
            imgUrl: this.state.imgUrl,
            stock: this.state.stock,
            description: this.state.description},
            {category: this.state.category}
        )
        
        this.props.history.push("/admin/products")

        this.setState({
            name: "",
            stock: "",
            price: "",
            imgUrl: "",
            description: "",
        })
    }

    render(){
        return(
            <AdminNewProduct
            allcategories={this.props.allcategories}
            handleName = {this.handleName}
            handlePrice = {this.handlePrice}
            handleImg = {this.handleImg}
            handleStock = {this.handleStock}
            handleDescription = {this.handleDescription}
            handleSubmit = {this.handleSubmit}
            handleCategory = {this.handleCategory}
            />
        )
    }

}

const mapStateToProps = (state) => {
    console.log('state del NewProductContainer = ', state)
    return{
        allcategories: state.admin.allcategories
    }
};

export default connect(mapStateToProps, {createAdminProduct, fetchAdminCategories})(AdminNewProductContainer)

