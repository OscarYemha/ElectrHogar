import React from 'react';
import {connect} from 'react-redux';
import AdminNewCategory from '../components/AdminNewCategory';
import {createAdminCategory} from '../actions/admin';

class AdminNewCategoryContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name: "",
            imgUrl: "",
        }

        this.handleName = this.handleName.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e){
        this.setState({name: e.target.value});
    }

    handleImg(e){
        this.setState({imgUrl: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createAdminCategory({
            name: this.state.name,
            imgUrl: this.state.imgUrl
        });

        this.props.history.push("/admin/categories");

        this.setState({
            name: "",
            imgUrl: "",
        })
    }

    render(){
        return(
            <AdminNewCategory
            handleName = {this.handleName}
            handleImg = {this.handleImg}
            handleSubmit = {this.handleSubmit}
            user = {this.props.user}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    
    }
};

export default connect(mapStateToProps, {createAdminCategory})(AdminNewCategoryContainer);

