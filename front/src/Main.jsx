import React from 'react';
import { connect } from "react-redux";
import {Route, Switch} from 'react-router-dom';
import {isLog} from './actions/users';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';
import FooterContainer from './container/FooterContainer';
import NavbarContainer from './container/NavbarContainer';
import ProductsContainer from './container/ProductsContainer';
import SingleProductContainer from './container/SingleProductContainer';
import CarouselContainer from './container/CarouselContainer';
import AdminProductsContainer from './container/AdminProductsContainer';
import NewProductContainer from './container/NewProductContainer'

class Main extends React.Component {

    componentDidMount(){
        this.props.isLog();
    }

    render(){
        return(
            
                
                <div id="Main">
                        <NavbarContainer/>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <div>
                                    
                                    <CarouselContainer />
                                    <FooterContainer/>
                                </div>
                            )} />
                            <Route path="/products" component={ProductsContainer} />
                            <Route path="/singleproduct/:id" component={SingleProductContainer} />
                            <Route path='/login' component={LoginContainer}/>
                            <Route path='/register' component={RegisterContainer}/>
                            <Route path='/admin/products' component={AdminProductsContainer}/>
                            <Route path='/admin/newproduct' component={NewProductContainer}/>
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