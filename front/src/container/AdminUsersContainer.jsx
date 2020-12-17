import React from 'react';
import {connect} from 'react-redux';
import AdminUsers from '../components/AdminUsers';
import {fetchAllUsers, userRol, deleteUser} from '../actions/admin';

class AdminUsersContainer extends React.Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleRoles = this.handleRoles.bind(this);
    }

    componentDidMount(){
        return this.props.fetchAllUsers();
    }

    handleDelete(user){
        this.props.deleteUser(user).then(()=>{
            this.props.fetchAllUsers();
        })
    }

    handleRoles(user, rol){
        this.props.userRol(user, rol).then(()=> {
            this.props.fetchAllUsers();
        })
    }

    render(){
        return(
            <AdminUsers 
            user={this.props.user} 
            allUsers={this.props.allUsers}
            handleDelete ={this.handleDelete}
            handleRoles ={this.handleRoles}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return{
        user: state.user.user,
        allUsers: state.admin.allusers
    }
}

export default connect(mapStateToProps, {fetchAllUsers, userRol, deleteUser})(AdminUsersContainer)