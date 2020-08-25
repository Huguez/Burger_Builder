import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 3.5,
    error: false,
    building: false
};

const INGREDIENT_PRICES = { 
    salad: 1,
    cheese: 1,
    bacon: 1,
    meat: 1
};

// const PRICE_BASE = 3.5;

const addIngredient = ( state, action ) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updateIngredients = updateObject( state.ingredients, updateIngredient )
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
        building: true
    };
    return updateObject( state, updateState );
};

const removeIngredient = ( state, action ) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updateIngredients = updateObject( state.ingredients, updateIngredient )
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
        building: false
    };
    return updateObject( state, updateState );
}

const setIngredients = ( state, action ) => {
    return updateObject( state, {
        ingredients: action.ingredients,
        totalPrice: 3.50,
        error: false,
        building: false
    } );
};

const reducer = ( state = initialState, action ) => {
    // console.log( state, action );
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:           return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT:        return removeIngredient( state, action );
        case actionTypes.SET_INGREDIENT:           return setIngredients( state, action );
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject( state, { error: true } );
        default:                                   return state;
    }
}

export default reducer;