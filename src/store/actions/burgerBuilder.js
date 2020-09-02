import * as actionTypes from './actionsTypes';
import instance from '../../axios-orders';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name 
    };
}

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name 
    };
}

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        instance.get( 'https://burguer-app-b2532.firebaseio.com/ingrediendts.json' ).then( response =>{ 
            
            // console.log( "wawa: ", response.data );

            dispatch( setIngredients( response.data ) );

        } ).catch( error => { dispatch( fetchIngredientsFailed() ) } );
    };
}