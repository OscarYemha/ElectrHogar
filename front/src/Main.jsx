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
import AdminUsersContainer from './container/AdminUsersContainer';
import CategoriesContainer from './container/CategoriesContainer';
import CartContainer from './container/CartContainer';
import SearchContainer from './container/SearchContainer';
import SingleCategoryContainer from './container/SingleCategoryContainer';
import CheckOutContainer from './container/CheckOutContainer';
import Confirmacion from "./components/ConfirmacionCompra";
// import OrdersContainer from "./containers/OrdersContainer";

class Main extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("entrando al DidMount del Main")
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
                            <Route exact path="/admin/users" component={AdminUsersContainer} />
                            <Route exact path='/categories' component={CategoriesContainer}/>
                            <Route path="/cart" component={CartContainer} />
                            <Route path="/search" component={SearchContainer} />
                            <Route exact path='/categories/:id' component={SingleCategoryContainer}/>
                            <Route path="/checkout" component={CheckOutContainer} />
                            <Route exact path="/confirmacion" component={Confirmacion} />
                            {/* <Route exact path="/orders" component={OrdersContainer} /> */}
                            
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