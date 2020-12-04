import React from 'react';
import NewProduct from '../components/NewProduct';
import {connect} from 'react-redux';
import {createAdminProduct, fetchAdminCategories} from '../actions/admin';

class NewProductContainer extends React.Component{
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

    handleSubmit(e){
        e.preventDefault();

        this.props.createAdminProduct({
            name: this.state.name,
            price: this.state.price,
            imgUrl: this.state.imgUrl,
            stock: this.state.stock,
            description: this.state.description,
        })
        
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
            <NewProduct
            allcategories={this.props.allcategories}
            handleName = {this.handleName}
            handlePrice = {this.handlePrice}
            handleImg = {this.handleImg}
            handleStock = {this.handleStock}
            handleDescription = {this.handleDescription}
            handleSubmit = {this.handleSubmit}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return{
        allcategories: state.admin.allcategories
    }
};

export default connect(mapStateToProps, {createAdminProduct, fetchAdminCategories})(NewProductContainer)

