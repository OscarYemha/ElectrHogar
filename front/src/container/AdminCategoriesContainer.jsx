import React from 'react';
import {connect} from 'react-redux';
import AdminCategories from '../components/AdminCategories';
import {fetchAdminCategories, deleteAdminCategory} from '../actions/admin';
import {fetchCategories} from '../actions/categories';


class AdminCategoriesContainer extends React.Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        return this.props.fetchAdminCategories();
    }

    handleDelete(category){
        this.props.deleteAdminCategory(category).then(() => {
            this.props.fetchAdminCategories();
        })
    }

    render(){
        return(
            <AdminCategories
            user = {this.props.user}
            allcategories = {this.props.allcategories}
            handleDelete = {this.handleDelete}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allcategories: state.admin.allcategories,
        user : state.user.user
    }
}

export default connect(mapStateToProps, {fetchAdminCategories, deleteAdminCategory, fetchCategories})(AdminCategoriesContainer);