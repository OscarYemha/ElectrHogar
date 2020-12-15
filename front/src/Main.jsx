import React from 'react';
import { connect } from "react-redux";
import {Route, Switch, Redirect} from 'react-router-dom';
import {isLog} from './actions/users';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';
import FooterContainer from './container/FooterContainer';
import NavbarContainer from './container/NavbarContainer';
import ProductsContainer from './container/ProductsContainer';
import SingleProductContainer from './container/SingleProductContainer';
import AdminProductsContainer from './container/AdminProductsContainer';
import AdminNewProductContainer from './container/AdminNewProductContainer';
import AdminEditProductContainer from './container/AdminEditProductContainer';
import AdminNewCategoryContainer from './container/AdminNewCategoryContainer';
import AdminCategoriesContainer from './container/AdminCategoriesContainer';
import CategoriesContainer from './container/CategoriesContainer';
import CartContainer from './container/CartContainer';
import SearchContainer from './container/SearchContainer';
import SingleCategoryContainer from './container/SingleCategoryContainer';


class Main extends React.Component {

    componentDidMount(){
        this.props.isLog();
    }

    render(){
        return(
            
                
                <div id="Main">
                    
                        <NavbarContainer history = {this.props.history}/>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <div>
                                    
                                    <Redirect to="/products"/>
                                    <FooterContainer/>
                                </div>
                            )} />
                            <Route exact path="/products" component={ProductsContainer} />
                            <Route exact path="/products/:name" component={ProductsContainer} />
                            <Route path="/singleproduct/:id" component={SingleProductContainer} />
                            <Route path='/login' component={LoginContainer}/>
                            <Route path='/register' component={RegisterContainer}/>
                            <Route exact path='/admin/products' component={AdminProductsContainer}/>
                            <Route exact path='/admin/newproduct' component={AdminNewProductContainer}/>
                            <Route exact path='/admin/product/:id' component={AdminEditProductContainer}/>
                            <Route exact path='/admin/newcategory' component={AdminNewCategoryContainer}/>
                            <Route exact path='/admin/categories' component={AdminCategoriesContainer}/>
                            <Route exact path='/categories' component={CategoriesContainer}/>
                            <Route path="/cart" component={CartContainer} />
                            <Route path="/search" component={SearchContainer} />
                            <Route exact path='/categories/:id' component={SingleCategoryContainer}/>
                            
                        </Switch>
                        
                </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {};
  };

const mapDispatchToProps = (dispatch) => {
    return {
       isLog: () => dispatch(isLog()),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Main);