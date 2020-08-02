import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import instance from '../../axios-orders';


const INGREDIENT_PRICES = { 
    salad: 1,
    cheese: 1,
    bacon: 1,
    meat: 1
 };

 const PRICE_BASE = 3.5;

class BurgerBuilder extends Component {
    
    state = {
        ingredientes: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        purchasable: false,
        purchasing: false,
        totalPrice: PRICE_BASE
    };
    

    addIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        
        const updateCount = oldCount + 1;
        
        const updateIngredients = { ...this.state.ingredientes };
        updateIngredients[type] = updateCount;
    
        let priceAddition = INGREDIENT_PRICES[type];
        
        const oldPrice = this.state.totalPrice; // Aqui
        
        const newPrice =  oldCount === 0 ? PRICE_BASE : oldPrice + priceAddition;
        
        this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );
        this.updatePurchaseableState( updateIngredients );
    }
    
    removeIngredient = ( type ) => {
        const oldCount = this.state.ingredientes[type];
        const oldPrice = this.state.totalPrice;

        const updateCount = oldCount - 1;
        const updateIngredients = { ...this.state.ingredientes };
        updateIngredients[type] = updateCount;

        const priceDedution = INGREDIENT_PRICES[type];
        
        const newPrice = updateCount > 0  ? oldPrice - priceDedution  : oldPrice ;
        
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

    puchase = () =>  {
        this.setState( { purchasing: true } );
    }

    cancelPuchase = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinue = () => {
        const order ={
            ingredients: this.state.ingredientes,
            price: this.state.totalPrice,
            customer: {
                name: 'Huguez',
                addres: {
                    street: 'calle 123',
                    zipcode: '12345',
                    country: 'Mexico' 
                },
                email: 'carlos.huguez@test.com'
            },
            deliveryMethod: 'fastest'
        }

        instance.post('/orders.json', order ).then( response => console.log(response) ).catch(error => console.log(error) );        
    }

    render(){
        const disableInfo ={ ...this.state.ingredientes };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // console.log(this.state.totalPrice);
        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClose={ this.cancelPuchase }  >
                    <OrderSummary
                        price={ this.state.totalPrice }  
                        purchaseCanceled={ this.cancelPuchase }
                        purchaseContinued={ this.purchaseContinue }
                        ingredientes={ this.state.ingredientes } />
                </Modal>

                <Burger ingredientes={ this.state.ingredientes }/>
                <BuildControls
                    ordered={ this.puchase } 
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