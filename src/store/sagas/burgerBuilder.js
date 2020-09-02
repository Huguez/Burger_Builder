import instance from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions';


export  function* initIngredientsSaga( action ){
    try{
        const response = yield instance.get( 'https://burguer-app-b2532.firebaseio.com/ingrediendts.json' );
        yield put( actions.setIngredients( response.data ) );
    }catch( error) {
        put( actions.fetchIngredientsFailed() ) ;
    }        
}



