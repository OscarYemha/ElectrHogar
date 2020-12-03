import React from 'react';
import SingleProduct from '../components/SingleProduct';
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../actions/singleProduct';

class SingleProductContainer extends React.Component{
    constructor(props){
        super(props);
        console.log('props del singleProduct', this.props)
    }

    componentDidMount(){
        console.log('componentDIdMount del singleProductContainer')
        this.props.fetchSingleProduct(this.props.match.params.id);
    }

    render(){
        console.log('Esto es props.singleProduct = ',this.props.singleProduct)
        return(
            <div>
                <SingleProduct
                singleProduct={this.props.singleProduct}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('state del singleProductContainer',state)
    return {
      singleProduct: state.singleProduct.singleProduct,
    };
  };

  const mapDispatchToProps = (dispatch) =>{
      return{
          fetchSingleProduct: (id)=> dispatch(fetchSingleProduct(id))
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer);
  