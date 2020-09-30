import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

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

    const dispatch =  useDispatch();

    const ings =  useSelector( state => state.burgerBuilder.ingredientes );
    const price =  useSelector( state => state.burgerBuilder.ingredientes );
    const error =  useSelector( state => state.burgerBuilder.error );
    const isAuthenticated =  useSelector( state => state.auth.token !== null );

    const onIngredientAdded      = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved    = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients      = useCallback( () => dispatch(actions.initIngredients()), [dispatch] );
    const onInitPurchase         = () => dispatch( actions.purchaseInit() );
    const onSetAuthRedirectPath  = (path) => dispatch( actions.setAuthRedirectPath( path ) );

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
        if( isAuthenticated ){
            setPurchasing( true );
        }else{
            onSetAuthRedirectPath( '/checkout' )
            props.history.push( '/auth' );
        }
    }

    const cancelPuchase = () => {
        setPurchasing( false  );
    }

    const purchaseContinue = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    useEffect ( () => {
        onInitIngredients();
    }, [onInitIngredients] );

    const disableInfo = { ...ings };
    
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    
    let orderSummary = null

    let burger = error ? <h3>Los Ingredientes No pueden cargar!!! </h3> : <Spinner />;

    if( ings ){
        
        burger = (
            <Aux>
                <Burger ingredientes={ ings }/>
                <BuildControls
                    ordered={ puchase } 
                    purchasable={ updatePurchaseableState( ings ) }
                    price={ price } 
                    disable={ disableInfo } 
                    removed={ onIngredientRemoved }
                    isAuth={ isAuthenticated } 
                    added={ onIngredientAdded } />
            </Aux>
        );
        orderSummary = <OrderSummary
                        price={ price }  
                        purchaseCanceled={ cancelPuchase }
                        purchaseContinued={ purchaseContinue }
                        ingredientes={ ings } />
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

export default withErrorHandler( burgerBuilder, instance );