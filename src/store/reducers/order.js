import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState ={
    orders: [],
    loading: false,
    purchased: false
}

const purchanseBurgerSuccess = ( state, action ) => {
    const newOrder = {
        ...action.orderData,
        purchased: true,
        id: action.orderId 
    };

    return updateObject( state, {
        loading: false,
        orders: state.orders.concat( newOrder )
    });
};

const fetchOrdersSuccess = ( state, action ) => {
    return  updateObject( state, {
        orders: action.orders,
        loading: false
    } );
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.PURCHANSE_INIT:           return updateObject( state, { purchased: false } );
        case actionTypes.PURCHANSE_BURGER_START:   return updateObject( state, { loading: true });
        case actionTypes.PURCHANSE_BURGER_SUCCESS: return purchanseBurgerSuccess( state, action );
        case actionTypes.PURCHANSE_BURGER_FAIL:    return updateObject( state, { loading: false } );
        case actionTypes.FETCH_ORDERS_START:       return updateObject( state,{ loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:     return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL:        return updateObject( state, { loading: false} );
        default:                                   return state;
    }
};

export default reducer;