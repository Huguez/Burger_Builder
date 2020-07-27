import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


class BurgerBuilder extends Component {
    
    state = {
        ingredientes:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    
    

    render(){
        
        return (
            <Aux>
                <Burger ingredientes={ this.state.ingredientes }/>
                <BuildControls />

            </Aux>
        );
    }
}

export default BurgerBuilder;