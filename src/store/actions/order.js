import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) =>{
    return {
        type: actionTypes.PURCHANSE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = ( error ) =>{
    return {
        type: actionTypes.PURCHANSE_BURGER_SUCCESS,
        error: error,
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHANSE_BURGER_START
    }
}

export const purchaseBurger = ( orderData, token ) => {
    return dispatch =>{
        dispatch( purchaseBurgerStart() );
        axios.post('/orders.json?auth=' + token, orderData ).then( 
            ( response ) => {                
                dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
            }
            ).catch(
                ( error ) => {
                    dispatch( purchaseBurgerFail( error ) )
            }
        );
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHANSE_INIT 
    }
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS ,
        orders: orders
    }
}

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = ( token ) =>{
    return (dispatch, getState) => {
        dispatch( fetchOrdersStart() );
        axios.get( '/orders.json?auth=' + token ).then( ( resp ) =>{
            const fetchOrders = [];

            for( let key in resp.data ){
                fetchOrders.push( { ...resp.data[key], id: key } );
            }

            dispatch( fetchOrdersSuccess( fetchOrders ) );

        }).catch( err => dispatch( fetchOrdersFail( err ) ) )
    }  
}