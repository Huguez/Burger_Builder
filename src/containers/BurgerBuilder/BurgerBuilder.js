import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionsTypes';

import Aux from '../../hoc/Aux/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner'
import instance from '../../axios-orders';


import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
    };    

    // addIngredient = ( type ) => {
    //     const oldCount = this.state.ingredientes[type];
        
    //     const updateCount = oldCount + 1;
        
    //     const updateIngredients = { ...this.state.ingredientes };
    //     updateIngredients[type] = updateCount;
    
    //     let priceAddition = INGREDIENT_PRICES[type];
        
    //     const oldPrice = this.state.totalPrice; // Aqui
        
    //     const newPrice =  oldCount === 0 ? PRICE_BASE : oldPrice + priceAddition;
        
    //     this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );
    //     this.updatePurchaseableState( updateIngredients );
    // }
    
    // removeIngredient = ( type ) => {
    //     const oldCount = this.state.ingredientes[type];
    //     const oldPrice = this.state.totalPrice;

    //     const updateCount = oldCount - 1;
    //     const updateIngredients = { ...this.state.ingredientes };
    //     updateIngredients[type] = updateCount;

    //     const priceDedution = INGREDIENT_PRICES[type];
        
    //     const newPrice = updateCount > 0  ? oldPrice - priceDedution  : oldPrice ;
        
    //     this.setState( { ingredientes: updateIngredients, totalPrice: newPrice } );

    //     // console.log(updateIngredients);
    //     this.updatePurchaseableState( updateIngredients );
    // }

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

        return sum > 0 ;

    }

    puchase = () =>  {
        this.setState( { purchasing: true } );
    }

    cancelPuchase = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinue = () => {
        // let queryParams = [];
        // for( let i in this.state.ingredientes ){
        //     queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredientes[i]) );
        // }

        // queryParams.push( 'price=' + this.state.totalPrice );
        
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('/checkout');
        // console.log("BurgerBuilder.js", queryString );
    }

    componentDidMount(){
        // console.log(this.props );
        // instance.get( 'https://burguer-app-b2532.firebaseio.com/ingrediendts.json' ).then( response =>{ 
        
        //     this.setState({ ingredientes: response.data });

        //     // console.log(response.data); 
        // } ).catch( error =>{ this.setState( { error: true } ) } );
    }

    render(){
        const disableInfo = { ...this.props.ings };
        
        let count = 0;
        
        for (let key in disableInfo) {
            count = disableInfo[key] > 0 ?  count + 1 : count ;
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        // const boleano = count >= 1 ? true : false;

        let orderSummary = null

        let burger = this.state.error ? <h3 style={{ textAlign : 'center' }} >Los Ingredientes No pueden cargar!!! </h3> : <Spinner />;

        if( this.props.ings ){
            // console.log( "BurgerBuilder ", this.props.ings);
            burger = (
                <Aux>
                    <Burger ingredientes={ this.props.ings }/>
                    <BuildControls
                        ordered={ this.puchase } 
                        purchasable={ this.updatePurchaseableState( this.props.ings ) }
                        price={ this.props.price } 
                        disable={ disableInfo } 
                        removed={ this.props.onIngredientRemoved } 
                        added={ this.props.onIngredientAdded } />
                </Aux>
            );
            orderSummary = <OrderSummary
                            price={ this.props.price }  
                            purchaseCanceled={ this.cancelPuchase }
                            purchaseContinued={ this.purchaseContinue }
                            ingredientes={ this.props.ings } />

        }


        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClose={ this.cancelPuchase }  >
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice 
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch( burgerBuilderActions.addIngredient( ingName ) ),
        onIngredientRemoved: (ingName) => dispatch( burgerBuilderActions.removeIngredient    ( ingName ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(BurgerBuilder, instance) );