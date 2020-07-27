import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = { 
    salad: 0.75,
    cheese: 0.75,
    bacon: 0.8,
    mean: 1.2
 };


class BurgerBuilder extends Component {
    
    state = {
        ingredientes: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 3.5
    };

    
    addIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        const updateCount = oldCount + 1;
        const updateIngredients = { ...this.state.ingredientes };

        updateIngredients[type] = updateCount;
    
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );
    }
    
    removeIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        const updateCount =  oldCount > 0 ?  oldCount - 1 : 0 ;
        const updateIngredients = { ...this.state.ingredientes };

        updateIngredients[type] = updateCount;
    
        const priceDedution = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = updateCount > 0  ? oldPrice - priceDedution  : oldPrice;

        this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );
    }


    render(){
        console.log(this.state.totalPrice);
        return (
            <Aux>
                <Burger ingredientes={ this.state.ingredientes }/>
                <BuildControls removed={ this.removeIngredient } added={ this.addIngredient } />
            </Aux>
        );
    }
}

export default BurgerBuilder;