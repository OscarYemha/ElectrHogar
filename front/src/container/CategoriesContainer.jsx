import React from 'react';
import Categories from '../components/Categories';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions/categories';
import FooterContainer from './FooterContainer';
import Jumbotron from '../components/Jumbotron';

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
                <Jumbotron/>
                <Categories
                categoriesArray = {this.props.categories}
                />
                <FooterContainer/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("state del CategoriesContainer = ",state)
    return{
        categories: state.categories.categories,
    }
}

export default connect(mapStateToProps,{fetchCategories})(CategoriesContainer);