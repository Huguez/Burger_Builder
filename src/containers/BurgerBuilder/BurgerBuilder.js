import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from  '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    
    state = {
        ingredientes:{
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }
    
    render(){
        
        return (
            <Aux>
                <Burger ingredientes={ this.state.ingredientes }/>
                <div> build controls </div>

            </Aux>
        );
    }
}

export default BurgerBuilder;