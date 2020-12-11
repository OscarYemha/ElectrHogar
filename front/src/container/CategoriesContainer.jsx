import React from 'react';
import Categories from '../components/Categories';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions/categories';
import FooterContainer from './FooterContainer';

class CategoriesContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        return this.props.fetchCategories();
        
    }

    render(){
        return(
            <div>
                <Categories
                categoriesArray = {this.props.categories}
                />
                <FooterContainer/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        categories: state.categories.categories,
    }
}

export default connect(mapStateToProps,{fetchCategories})(CategoriesContainer);