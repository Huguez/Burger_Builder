import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner'
import instance from '../../axios-orders';


import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
    };    

    updatePurchaseableState( ing ){
        
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
        if( this.props.isAuthenticated ){
            this.setState( { purchasing: true } );
        }else{
            this.props.onSetRedirectPath( '/checkout' )
            this.props.history.push( '/auth' );
        }
    }

    cancelPuchase = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinue = () => {
        
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        
    }

    componentDidMount(){

        console.log(this.props.ings);
        this.props.onInitIngredients();
        console.log(this.props.ings);
    }

    render(){
        const disableInfo = { ...this.props.ings };
        
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null

        let burger = this.props.error ? <h3>Los Ingredientes No pueden cargar!!! </h3> : <Spinner />;

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
                        isAuth={ this.props.isAuthenticated } 
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded:     (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:   (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:     () => dispatch(actions.initIngredients()),
        onInitPurchase:        () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, instance ));