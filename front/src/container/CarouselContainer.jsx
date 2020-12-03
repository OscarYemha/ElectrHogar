import React from 'react';
import {connect} from 'react-redux'
import Carousel from '../components/Carousel';

class CarouselContainer extends React.Component{
    render(){
        return(
            <div>
            <Carousel/>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {};
  };
  
  export default connect(mapStateToProps, {
    })(CarouselContainer);