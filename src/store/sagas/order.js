import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';


export function* purchaseBurgerSaga( action ){
    yield put( actions.purchaseBurgerStart() );
    try{
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData );
        yield put( actions.purchaseBurgerSuccess( response.data.name, action.orderData ) );
    }catch( error ){
        put( actions.purchaseBurgerFail( error ) )
    }
}

export function* fetchOrdersSaga( action ){
    try{
        yield put( actions.fetchOrdersStart() );
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const resp = yield axios.get( '/orders.json' + queryParams )
        const fetchOrders = [];

        for( let key in resp.data ){
            fetchOrders.push( { ...resp.data[key], id: key } );
        }

        yield put( actions.fetchOrdersSuccess( fetchOrders ) );
    }catch( err ){
        yield put( actions.fetchOrdersFail( err ) );
    }
}   