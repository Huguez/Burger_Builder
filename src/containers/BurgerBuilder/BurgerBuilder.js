import React, { useState, useEffect } from 'react';
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

const burgerBuilder  = props => {
    
    const [ purchasing, setPurchasing ] = useState( false );

    const { onInitIngredients } = props;

    const updatePurchaseableState = ( ing ) => {
        
        const sum = Object.keys( ing ).map(
            ( igKey )=>{
                return ing[igKey]
            }
        ).reduce( ( sum, el ) => {
            return sum +el;
        }, 0 );
        return sum > 0 ;
    }

    const puchase = () =>  {
        if( props.isAuthenticated ){
            setPurchasing( true );
        }else{
            props.onSetRedirectPath( '/checkout' )
            props.history.push( '/auth' );
        }
    }

    const cancelPuchase = () => {
        setPurchasing( false  );
    }

    const purchaseContinue = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    useEffect ( () => {
        onInitIngredients();
    }, [onInitIngredients] );

    const disableInfo = { ...props.ings };
    
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    
    let orderSummary = null

    let burger = props.error ? <h3>Los Ingredientes No pueden cargar!!! </h3> : <Spinner />;

    if( props.ings ){
        
        burger = (
            <Aux>
                <Burger ingredientes={ props.ings }/>
                <BuildControls
                    ordered={ puchase } 
                    purchasable={ updatePurchaseableState( props.ings ) }
                    price={ props.price } 
                    disable={ disableInfo } 
                    removed={ props.onIngredientRemoved }
                    isAuth={ props.isAuthenticated } 
                    added={ props.onIngredientAdded } />
            </Aux>
        );
        orderSummary = <OrderSummary
                        price={ props.price }  
                        purchaseCanceled={ cancelPuchase }
                        purchaseContinued={ purchaseContinue }
                        ingredientes={ props.ings } />
    }

    return (
        <Aux>
            <Modal show={ purchasing } modalClose={ cancelPuchase }  >
                { orderSummary }
            </Modal>
            { burger }
        </Aux>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( burgerBuilder, instance ));