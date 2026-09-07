import React from 'react';
import { connect } from 'react-redux';
import AdminEditCategory from '../components/AdminEditCategory';
import {
    editAdminCategory,
    fetchAdminCategories
} from '../actions/admin';

class AdminEditCategoryContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            imgUrl: "",
        };

        this.handleName = this.handleName.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchAdminCategories().then(() => {
            const category = this.props.allcategories.find(
                (category) =>
                    category.id === Number(this.props.match.params.id)
            );

            if (category) {
                this.setState({
                    name: category.name,
                    imgUrl: category.imgUrl || "",
                });
            }
        });
    }

    handleName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleImg(e) {
        this.setState({
            imgUrl: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.editAdminCategory({
            id: Number(this.props.match.params.id),
            name: this.state.name,
            imgUrl: this.state.imgUrl,
        }).then(() => {
            this.props.history.push("/admin/categories");
        });
    }

    render() {
        return (
            <AdminEditCategory
                handleName={this.handleName}
                handleImg={this.handleImg}
                handleSubmit={this.handleSubmit}
                name={this.state.name}
                imgUrl={this.state.imgUrl}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allcategories: state.admin.allcategories,
        user: state.user.user,
    };
};

export default connect(
    mapStateToProps,
    {
        editAdminCategory,
        fetchAdminCategories,
    }
)(AdminEditCategoryContainer);