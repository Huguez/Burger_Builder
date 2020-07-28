import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = { 
    salad: 1,
    cheese: 1,
    bacon: 1,
    meat: 1
 };

class BurgerBuilder extends Component {
    
    state = {
        ingredientes: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        purchasable: false,
        totalPrice: 3.5
    };
    

    addIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        const updateCount = oldCount + 1;
        const updateIngredients = { ...this.state.ingredientes };
        updateIngredients[type] = updateCount;
    
        let priceAddition = INGREDIENT_PRICES[type];
        
        if( priceAddition === undefined ){
            priceAddition = INGREDIENT_PRICES[type];
            console.log("INGREDIENT_PRICES[type]: ", INGREDIENT_PRICES[type] );
            console.log("priceAddition: ", priceAddition );
        }

        const oldPrice = this.state.totalPrice;
        
        const newPrice = oldPrice + priceAddition;
        
        console.log("priceAddition: ", priceAddition );
        // console.log("type: ", type );
        
        // console.log("oldPrice: ", oldPrice );
        
        // console.log("newPrice: ", newPrice );
        
        this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );
        this.updatePurchaseableState( updateIngredients );
    }
    
    removeIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        const oldPrice = this.state.totalPrice;
        
        if( oldCount <= 0 ){
            console.log("wawa");
            return;
        }

        const updateCount = oldCount - 1;
        const updateIngredients = { ...this.state.ingredientes };
        updateIngredients[type] = updateCount;

        const priceDedution = INGREDIENT_PRICES[type];
        
        const newPrice = updateCount > 0  ? oldPrice - priceDedution  : oldPrice ;
        
        // console.log("oldCount: ", oldCount );
        
        // console.log("priceDedution: ", priceDedution );
        
        // console.log("oldPrice: ", oldPrice );
        
        // console.log("newPrice: ", newPrice );
        
        this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );

        console.log( this.state.ingredientes );

        // console.log(updateIngredients);
        this.updatePurchaseableState( updateIngredients );
    }

    updatePurchaseableState( ing ){
        // const ing ={
        //     ...this.state.ingredientes
        // };
        
        const sum = Object.keys( ing ).map(
            ( igKey )=>{
                return ing[igKey]
            }
        ).reduce( ( sum, el ) => {
            return sum +el;
        }, 0 );

        this.setState( { purchasable: sum > 0 } );

    }



    render(){
        const disableInfo ={ ...this.state.ingredientes };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // console.log(this.state.totalPrice);
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredientes={ this.state.ingredientes } />
                </Modal>

                <Burger ingredientes={ this.state.ingredientes }/>
                <BuildControls 
                    purchasable={ this.state.purchasable }
                    price={ this.state.totalPrice } 
                    disable={ disableInfo } 
                    removed={ this.removeIngredient } 
                    added={ this.addIngredient } />
            </Aux>
        );
    }
}

export default BurgerBuilder;